import { useEffect, useRef, useState } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import cebuSchools from "../data/cebu_schools.json";
import JobSeekerPortalScaffold from "./JobSeekerPortalScaffold";
import { FiEdit2, FiPlus, FiTrash2, FiDownload, FiUpload, FiUser, FiBriefcase, FiBook, FiFileText, FiHeart, FiActivity, FiSave, FiMapPin, FiMail, FiAward, FiGrid, FiCheck, FiCircle } from "react-icons/fi";

function Profile() {

	const [activeTab, setActiveTab] = useState("overview");
	const [user, setUser] = useState(null);
	const resumeInputRef = useRef(null);
	const [resumeFileName, setResumeFileName] = useState("");
	const [resumeFile, setResumeFile] = useState(null);
	const [isAddingExperience, setIsAddingExperience] = useState(false);
	const [skillInput, setSkillInput] = useState("");
	const [isAddingSkill, setIsAddingSkill] = useState(false);
	const [isAddingEducation, setIsAddingEducation] = useState(false);
	const [editingEducationIndex, setEditingEducationIndex] = useState(null);
	const [schools, setSchools] = useState([]);

	
	const [educations, setEducations] = useState([
		{
			degree: "BS Information Technology",
			school: "University of Cebu",
			graduation: "Graduated 2026",
			level: "Bachelor's Degree",
		},
	]);

	const [profileData, setProfileData] = useState({
		fullName: "",
		email: "",
		phone: "",
		address: "",
		dateOfBirth: "",
		gender: "",
		preferredJobCategory: "",
		yearsOfExperience: "",
		currentStatus: "Student",
		skills: [],
		bio: "",
	});
	const [experiences, setExperiences] = useState([]);

	const [experienceForm, setExperienceForm] = useState({
		title: "",
		company: "",
		startDate: "",
		endDate: "",
		duration: "",
		location: "",
		description: "",
	});

	const [educationForm, setEducationForm] = useState({
		degree: "",
		school: "",
		fieldOfStudy: "",
		startYear: "",
		endYear: "",
		level: "",
	});

	const formatPeriodDate = (dateValue) => {
		if (!dateValue) return "";
		return new Date(dateValue).toLocaleDateString("en-US", {
			year: "numeric",
			month: "short",
			day: "2-digit",
		});
	};

	const calculateDuration = (startDate, endDate) => {
		if (!startDate || !endDate) return "";

		const start = new Date(startDate);
		const end = new Date(endDate);

		if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime()) || end < start) {
			return "";
		}

		const dayInMs = 1000 * 60 * 60 * 24;
		const diffDays = Math.floor((end - start) / dayInMs) + 1;

		if (diffDays < 30) {
			return `${diffDays} day${diffDays === 1 ? "" : "s"}`;
		}

		if (diffDays < 365) {
			const months = Math.floor(diffDays / 30);
			const days = diffDays % 30;
			return days > 0
				? `${months} month${months === 1 ? "" : "s"} ${days} day${days === 1 ? "" : "s"}`
				: `${months} month${months === 1 ? "" : "s"}`;
		}

		const years = Math.floor(diffDays / 365);
		const remainingDays = diffDays % 365;
		const months = Math.floor(remainingDays / 30);

		if (months > 0) {
			return `${years} year${years === 1 ? "" : "s"} ${months} month${months === 1 ? "" : "s"}`;
		}

		return `${years} year${years === 1 ? "" : "s"}`;
	};

	useEffect(() => {

	const loadProfile = async () => {

		try {

			const token = localStorage.getItem("token");

			if (!token) return;

			const decoded = jwtDecode(token);

			setUser(decoded);

			const response = await axios.get(
				`${import.meta.env.VITE_API_URL}/api/profile/${decoded.sub}`
			);

			const data = response.data;
			const experienceRes = await axios.get(
			`${import.meta.env.VITE_API_URL}/api/experiences/${decoded.sub}`
			);

			setExperiences(experienceRes.data);
			const educationRes = await axios.get(
				`${import.meta.env.VITE_API_URL}/api/educations/${decoded.sub}`
			);

			setEducations(educationRes.data);

			// load list of Philippine schools (merge with curated Cebu list)
			try {
				const schoolsRes = await axios.get(
					"http://universities.hipolabs.com/search?country=Philippines"
				);
				const fetchedNames = Array.isArray(schoolsRes.data)
					? schoolsRes.data.map((s) => s.name)
					: [];
				const merged = Array.from(new Set([...(cebuSchools || []), ...fetchedNames])).sort();
				setSchools(merged);
			} catch (err) {
				console.log("Failed to load schools list", err);
				// fallback to curated Cebu list only
				setSchools((cebuSchools || []).slice().sort());
			}

			if (data) {

    setProfileData({
        fullName:
            data.full_name ||
            decoded.fullName ||
            "",

        email:
            decoded.sub || "",

        phone:
            data.contact_number || "",

        address:
            data.address || "",

        dateOfBirth:
            data.date_of_birth || "",

        gender:
            data.gender || "",

        preferredJobCategory:
            data.preferred_job_category || "",

        yearsOfExperience:
            data.years_of_experience || "",

        currentStatus:
            data.current_status || "Student",

        skills:
            Array.isArray(data.skills)
                ? data.skills
                : [],

        bio:
            data.bio || "",
    });
	setResumeFileName(
    data.resume_url || ""
);

} else {

    setProfileData((prev) => ({
        ...prev,
        fullName: decoded.fullName || "",
        email: decoded.sub || "",
    }));

}

		} catch (error) {

			console.log(error);

		}

	};

	loadProfile();

}, []);


	const handleInputChange = (e) => {

		const { name, value } = e.target;

		setProfileData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleSaveChanges = async () => {

	try {

		if (!user) {
			alert("User not found");
			return;
		}

		await axios.post(
			`${import.meta.env.VITE_API_URL}/api/profile`,
			{
				id: user.sub,
				userId: user.sub,
				full_name: profileData.fullName,
				contact_number: profileData.phone,
				address: profileData.address,
				date_of_birth:
					profileData.dateOfBirth || null,
				gender: profileData.gender,
				preferred_job_category:
					profileData.preferredJobCategory,
				years_of_experience:
					profileData.yearsOfExperience,
				current_status:
					profileData.currentStatus,
				skills: profileData.skills,
				bio: profileData.bio || "",
			}
		);

		alert("Profile saved successfully");

	} catch (error) {

		console.log(error);
		alert("Failed to save profile");

	}
};

	const handleAddSkill = () => {
		const trimmedSkill = skillInput.trim();

		if (!trimmedSkill) return;

		setProfileData((prev) => ({
			...prev,
			skills: [...prev.skills, trimmedSkill],
		}));

		setSkillInput("");
		setIsAddingSkill(false);
	};

	const handleStartAddSkill = () => {
		setIsAddingSkill(true);
	};

	const handleCancelAddSkill = () => {
		setSkillInput("");
		setIsAddingSkill(false);
	};

	const handleRemoveSkill = (index) => {
		setProfileData((prev) => ({
			...prev,
			skills: prev.skills.filter((_, skillIndex) => skillIndex !== index),
		}));
	};

	const handleExperienceFormChange = (e) => {
		const { name, value } = e.target;
		setExperienceForm((prev) => {
			const next = {
				...prev,
				[name]: value,
			};

			if (name === "startDate" || name === "endDate") {
				next.duration = calculateDuration(next.startDate, next.endDate);
			}

			return next;
		});
	};

	const handleEducationFormChange = (e) => {
		const { name, value } = e.target;
		setEducationForm((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleStartAddEducation = () => {
		setEducationForm({
			degree: "",
			school: "",
			fieldOfStudy: "",
			startYear: "",
			endYear: "",
			level: "",
		});
		setEditingEducationIndex(null);
		setIsAddingEducation(true);
	};

	const handleCancelEducationForm = () => {
		setEducationForm({
			degree: "",
			school: "",
			fieldOfStudy: "",
			startYear: "",
			endYear: "",
			level: "",
		});
		setIsAddingEducation(false);
		setEditingEducationIndex(null);
	};

	const handleAddExperience = () => {
		setIsAddingExperience(true);
	};

	const handleCancelExperienceForm = () => {
		setExperienceForm({
			title: "",
			company: "",
			startDate: "",
			endDate: "",
			duration: "",
			location: "",
			description: "",
		});
		setIsAddingExperience(false);
	};

	const handleSubmitExperience = async () => {
		if (!user) {
			alert("User not found");
			return;
		}

		if (!experienceForm.title.trim() || !experienceForm.company.trim()) {
			alert("Title and company are required");
			return;
		}

		if (!experienceForm.startDate || !experienceForm.endDate) {
			alert("Start date and end date are required");
			return;
		}

		if (experienceForm.endDate < experienceForm.startDate) {
			alert("End date must be after start date");
			return;
		}

		try {
			const period = `${formatPeriodDate(experienceForm.startDate)} - ${formatPeriodDate(experienceForm.endDate)}`;

			const payload = {
				userId: user.sub,
				title: experienceForm.title.trim(),
				company: experienceForm.company.trim(),
				period,
				duration: experienceForm.duration,
				location: experienceForm.location,
				description: experienceForm.description,
			};

			const response = await axios.post(
				`${import.meta.env.VITE_API_URL}/api/experiences`,
				payload
			);

			setExperiences((prev) => [...prev, response.data]);
			handleCancelExperienceForm();
		} catch (error) {
			console.log(error);
			alert("Failed to save experience");
		}
	};

	const handleEditExperience = (index) => {
		const currentExperience = experiences[index];
		const title = prompt("Edit experience title", currentExperience.title);
		if (!title?.trim()) return;
		const company = prompt("Edit company name", currentExperience.company);
		if (!company?.trim()) return;
		const period = prompt("Edit date range", currentExperience.period) || "";
		const duration = prompt("Edit duration", currentExperience.duration) || "";
		const location = prompt("Edit location", currentExperience.location) || "";
		const description = prompt("Edit description", currentExperience.description) || "";

		setExperiences((prev) =>
			prev.map((experience, experienceIndex) =>
				experienceIndex === index
					? {
						...experience,
						title: title.trim(),
						company: company.trim(),
						period,
						duration,
						location,
						description,
					}
					: experience
			)
		);
	};

	const handleRemoveExperience = async (id) => {

	try {

		await axios.delete(
			`${import.meta.env.VITE_API_URL}/api/experiences/${id}`
		);

		setExperiences((prev) =>
			prev.filter((experience) =>
				experience.id !== id
			)
		);

	} catch (error) {

		console.log(error);

		alert("Failed to delete experience");

	}
};

	const handleSubmitEducation = async () => {

		if (!user) {
			alert("User not found");
			return;
		}

		if (!educationForm.degree.trim() || !educationForm.school.trim()) {
			alert("Degree and school are required");
			return;
		}

		try {
			if (editingEducationIndex !== null) {
				// Update local state for editable entry
				setEducations((prev) =>
					prev.map((edu, idx) =>
						idx === editingEducationIndex ? { ...edu, ...educationForm } : edu
					)
				);
				handleCancelEducationForm();
				return;
			}

			const response = await axios.post(
				`${import.meta.env.VITE_API_URL}/api/educations`,
				{
					userId: user.sub,
					school: educationForm.school.trim(),
					degree: educationForm.degree.trim(),
					fieldOfStudy: educationForm.fieldOfStudy || "",
					startYear: educationForm.startYear || "",
					endYear: educationForm.endYear || "",
					level: educationForm.level || "",
				}
			);

			setEducations((prev) => [...prev, response.data]);
			handleCancelEducationForm();
		} catch (error) {
			console.log(error);
			alert("Failed to save education");
		}
	};

	const handleEditEducation = (index) => {
		const currentEducation = educations[index];
		setEducationForm({
			degree: currentEducation.degree || "",
			school: currentEducation.school || "",
			fieldOfStudy: currentEducation.fieldOfStudy || "",
			startYear: currentEducation.startYear || currentEducation.startYear || "",
			endYear: currentEducation.endYear || currentEducation.endYear || "",
			level: currentEducation.level || "",
		});
		setEditingEducationIndex(index);
		setIsAddingEducation(true);
	};

	const handleRemoveEducation = async (id) => {

	try {

		await axios.delete(
			`${import.meta.env.VITE_API_URL}/api/educations/${id}`
		);

		setEducations((prev) =>
			prev.filter(
				(education) =>
					education.id !== id
			)
		);

	} catch (error) {

		console.log(error);

		alert("Failed to delete education");

	}
};

	const handleResumeUpload = async () => {

	if (!resumeFile) {

		alert("Please select a file");

		return;
	}

	try {

		const formData = new FormData();

		formData.append("file", resumeFile);

		formData.append("userId", user.sub);

		const response = await axios.post(
			`${import.meta.env.VITE_API_URL}/api/resume/upload`,
			formData,
			{
				headers: {
					"Content-Type":
						"multipart/form-data",
				},
			}
		);


		setProfileData((prev) => ({
			...prev,
			resume_url: response.data,
		}));

		alert("Resume uploaded successfully");

	} catch (error) {

		console.log(error);

		alert("Upload failed");

	}
};
const handleDeleteResume = async () => {

	try {

		await axios.delete(
			`${import.meta.env.VITE_API_URL}/api/resume/${user.sub}`
		);

		setResumeFile(null);

		setResumeFileName("");

		setProfileData((prev) => ({
			...prev,
			resume_url: "",
		}));

		alert("Resume deleted successfully");

	} catch (error) {

		console.log(error);

		alert("Failed to delete resume");

	}
};
	const handleChangeResume = () => {
		resumeInputRef.current?.click();
	};

	const handleViewResume = () => {
		if (resumeFileName) {
			window.open(`http://localhost:8080/uploads/${resumeFileName}`, "_blank");
		}
	};

	const handleSkillInputKeyDown = (event) => {
		if (event.key === "Enter") {
			event.preventDefault();
			handleAddSkill();
		}

		if (event.key === "Escape") {
			event.preventDefault();
			handleCancelAddSkill();
		}
	};

	return (
		<JobSeekerPortalScaffold activePage="profile">
			<div className="profile-container">
				<div className="profile-header">
					<div className="profile-header-content">
						<div className="profile-avatar-large">
							{profileData.fullName
								? profileData.fullName
										.split(" ")
										.map((name) => name[0])
										.join("")
										.toUpperCase()
								: "JS"}
						</div>

						<div className="profile-header-info">
							<h1 className="profile-title">
								{profileData.fullName || "Job Seeker Profile"}
							</h1>
							<div className="profile-header-meta">
								<span className="profile-meta-item">
									<FiMail size={14} />
									{profileData.email || "Add your email"}
								</span>
								<span className="profile-meta-item">
									<FiMapPin size={14} />
									{profileData.address || "Add your address"}
								</span>
							</div>
						</div>
					</div>
					<div className="profile-completion">
						<span className="completion-badge">
							Profile 50% complete
						</span>
					</div>
				</div>

				{/* Tabs */}
				<div className="profile-tabs">
					<button
						className={`profile-tab ${activeTab === "overview" ? "active" : ""}`}
						onClick={() => setActiveTab("overview")}
					>
						<FiGrid size={16} /> Overview
					</button>
					<button
						className={`profile-tab ${activeTab === "experience" ? "active" : ""}`}
						onClick={() => setActiveTab("experience")}
					>
						<FiBriefcase size={16} /> Experience
					</button>
					<button
						className={`profile-tab ${activeTab === "education" ? "active" : ""}`}
						onClick={() => setActiveTab("education")}
					>
						<FiBook size={16} /> Education
					</button>
					<button
						className={`profile-tab ${activeTab === "resume" ? "active" : ""}`}
						onClick={() => setActiveTab("resume")}
					>
						<FiFileText size={16} /> Resume
					</button>
					<button
						className={`profile-tab ${activeTab === "account" ? "active" : ""}`}
						onClick={() => setActiveTab("account")}
					>
						<FiHeart size={16} /> Account
					</button>
				</div>

				{/* Main Content + Sidebar */}
				<div className="profile-content-wrapper">
					<div className="profile-main">
						{/* Overview Tab */}
						{activeTab === "overview" && (
							<>
								{/* Personal Information */}
								<div className="profile-section">
									<div className="section-header">
										<h2 className="section-title"><FiUser size={18} /> Personal information</h2>
										<div>
											<button className="section-view" onClick={() => setActiveTab('overview')}>View</button>
											<button className="btn-edit" type="button">
												<FiEdit2 size={16} /> Edit
											</button>
										</div>
									</div>
									<div className="form-grid">
										<div className="form-group">
											<label>FULL NAME</label>
											<input
												type="text"
												name="fullName"
												value={profileData.fullName}
												onChange={handleInputChange}
											/>
										</div>
										<div className="form-group">
											<label>CONTACT NUMBER</label>
											<input
												type="tel"
												name="phone"
												value={profileData.phone}
												onChange={handleInputChange}
											/>
										</div>
										<div className="form-group full-width">
											<label>ADDRESS</label>
											<input
												type="text"
												name="address"
												value={profileData.address}
												onChange={handleInputChange}
											/>
										</div>
										<div className="form-group">
											<label>DATE OF BIRTH (optional)</label>
											<input
												type="date"
												name="dateOfBirth"
												value={profileData.dateOfBirth}
												onChange={handleInputChange}
											/>
										</div>
										<div className="form-group">
											<label>GENDER (optional)</label>
											<select
												name="gender"
												value={profileData.gender}
												onChange={handleInputChange}
											>
												<option value="">Select gender</option>
												<option value="Male">Male</option>
												<option value="Female">Female</option>
												<option value="Other">Other</option>
											</select>
										</div>
									</div>
								</div>

								{/* Professional Information */}
								<div className="profile-section">
									<div className="section-header">
										<h2 className="section-title"><FiBriefcase size={18} /> Professional information</h2>
										<div>
											<button className="section-view" onClick={() => setActiveTab('overview')}>View</button>
											<button className="btn-edit" type="button">
												<FiEdit2 size={16} /> Edit
											</button>
										</div>
									</div>
									<div className="form-grid">
										<div className="form-group">
											<label>PREFERRED JOB CATEGORY</label>
											<select
												name="preferredJobCategory"
												value={profileData.preferredJobCategory}
												onChange={handleInputChange}
											>
												<option value="">Select category</option>
												<option value="Information Technology">Information Technology</option>
												<option value="Finance">Finance</option>
												<option value="Marketing">Marketing</option>
											</select>
										</div>
										<div className="form-group">
											<label>YEARS OF EXPERIENCE</label>
											<select
												name="yearsOfExperience"
												value={profileData.yearsOfExperience}
												onChange={handleInputChange}
											>
												<option value="">Select experience</option>
												<option value="0-1">0-1 years</option>
												<option value="1-2">1-2 years</option>
												<option value="2-5">2-5 years</option>
												<option value="5+">5+ years</option>
											</select>
										</div>
									</div>
									<div className="form-group">
										<label>CURRENT STATUS</label>
										<div className="status-radio-group">
											{["Student", "Fresh Graduate", "Employed", "Freelance"].map((status) => (
												<label key={status} className="radio-label">
													<input
														type="radio"
														name="currentStatus"
														value={status}
														checked={profileData.currentStatus === status}
														onChange={handleInputChange}
													/>
													{status}
												</label>
											))}
										</div>
									</div>
									<div className="form-group">
										<label>SKILLS</label>
										<div className="skills-container">
											<div className="skill-tags">
												{profileData.skills &&
													profileData.skills.map((skill, index) => (
														<span key={index} className="skill-tag">
															{skill}
															<button
																type="button"
																className="tag-remove"
																onClick={() => handleRemoveSkill(index)}
															>
																×
															</button>
														</span>
													))}
											</div>
											{isAddingSkill ? (
												<div className="skill-input-row">
													<input
														type="text"
														value={skillInput}
														onChange={(e) => setSkillInput(e.target.value)}
														onKeyDown={handleSkillInputKeyDown}
														aria-label="Add skill"
													/>
													<div className="skill-input-actions">
														<button type="button" className="btn-small btn-outline" onClick={handleCancelAddSkill}>
															Cancel
														</button>
														<button type="button" className="btn-small btn-solid" onClick={handleAddSkill}>
															Add skill
														</button>
													</div>
												</div>
											) : (
												<button type="button" className="btn-add-skill" onClick={handleStartAddSkill}>
													+ Add skill
												</button>
											)}
										</div>
									</div>
								</div>

								{/* Work Experience */}
								<div className="profile-section">
									<div className="section-header">
										<h2 className="section-title"><FiBriefcase size={18} /> Work experience</h2>
										<div>
											<button className="section-view" onClick={() => setActiveTab('experience')}>View</button>
											<button className="btn-add-experience" type="button" onClick={handleAddExperience}>
												<FiPlus size={16} /> Add experience
											</button>
										</div>
									</div>
									{isAddingExperience && (
										<div className="experience-form-card">
											<div className="form-grid">
												<div className="form-group">
													<label>TITLE</label>
													<input
														type="text"
														name="title"
														value={experienceForm.title}
														onChange={handleExperienceFormChange}
													/>
												</div>
												<div className="form-group">
													<label>COMPANY</label>
													<input
														type="text"
														name="company"
														value={experienceForm.company}
														onChange={handleExperienceFormChange}
													/>
												</div>
												<div className="form-group">
													<label>DATE RANGE</label>
													<div className="date-range-fields">
														<input
															type="date"
															name="startDate"
															value={experienceForm.startDate}
															onChange={handleExperienceFormChange}
														/>
														<input
															type="date"
															name="endDate"
															value={experienceForm.endDate}
															onChange={handleExperienceFormChange}
														/>
													</div>
												</div>
												<div className="form-group">
													<label>DURATION</label>
													<input
														type="text"
														name="duration"
														value={experienceForm.duration}
														readOnly
													/>
												</div>
												<div className="form-group full-width">
													<label>LOCATION</label>
													<input
														type="text"
														name="location"
														value={experienceForm.location}
														onChange={handleExperienceFormChange}
													/>
												</div>
												<div className="form-group full-width">
													<label>DESCRIPTION</label>
													<input
														type="text"
														name="description"
														value={experienceForm.description}
														onChange={handleExperienceFormChange}
													/>
												</div>
											</div>
											<div className="experience-form-actions">
												<button type="button" className="btn-small btn-outline" onClick={handleCancelExperienceForm}>
													Cancel
												</button>
												<button type="button" className="btn-small btn-solid" onClick={handleSubmitExperience}>
													Save experience
												</button>
											</div>
										</div>
									)}
									{experiences.map((experience, index) => (
										<div className="experience-item" key={`${experience.title}-${index}`}>
											<div className="experience-header">
												<div className="experience-icon"><FiBriefcase size={24} /></div>
												<div>
													<h3>{experience.title}</h3>
													<p className="experience-company">{experience.company}</p>
												</div>
											</div>
											<div className="experience-details">
												<span><FiActivity size={14} /> {experience.period}</span>
												{experience.duration ? <span>{experience.duration}</span> : null}
												{experience.location ? <span><FiMapPin size={14} /> {experience.location}</span> : null}
											</div>
											<p className="experience-description">{experience.description}</p>
											<div className="experience-actions">
												<button type="button" className="btn-small" onClick={() => handleEditExperience(index)}>
													<FiEdit2 size={14} /> Edit
												</button>
												<button type="button" className="btn-small" onClick={() => handleRemoveExperience(experience.id)}>
													<FiTrash2 size={14} /> Remove
												</button>
											</div>
										</div>
									))}
								</div>

								{/* Education */}
								<div className="profile-section">
									<div className="section-header">
										<h2 className="section-title"><FiBook size={18} /> Education</h2>
										<div>
											<button className="section-view" onClick={() => setActiveTab('education')}>View</button>
											<button className="btn-add-education" type="button" onClick={handleStartAddEducation}>
												<FiPlus size={16} /> Add education
											</button>
										</div>
									</div>

									{(isAddingEducation || editingEducationIndex !== null) && (
										<div className="experience-form-card">
											<div className="form-grid">
												<div className="form-group">
													<label>DEGREE / COURSE</label>
													<input
														type="text"
														name="degree"
														value={educationForm.degree}
														onChange={handleEducationFormChange}
													/>
												</div>
												<div className="form-group">
													<label>SCHOOL</label>
													{schools && schools.length > 0 ? (
														<select name="school" value={educationForm.school} onChange={handleEducationFormChange}>
															<option value="">Select school</option>
															{schools.map((s, idx) => (
																<option key={idx} value={s}>{s}</option>
															))}
														</select>
													) : (
														<input
															type="text"
															name="school"
															value={educationForm.school}
															onChange={handleEducationFormChange}
														/>
													)}
												</div>
												<div className="form-group">
													<label>FIELD OF STUDY</label>
													<input
														type="text"
														name="fieldOfStudy"
														value={educationForm.fieldOfStudy}
														onChange={handleEducationFormChange}
													/>
												</div>
												<div className="form-group">
													<label>DATE RANGE</label>
													<div className="date-range-fields">
														<input
															type="date"
															name="startYear"
															value={educationForm.startYear}
															onChange={handleEducationFormChange}
														/>
														<input
															type="date"
															name="endYear"
															value={educationForm.endYear}
															onChange={handleEducationFormChange}
														/>
													</div>
												</div>
												<div className="form-group full-width">
													<label>LEVEL</label>
													<input
														type="text"
														name="level"
														value={educationForm.level}
														onChange={handleEducationFormChange}
													/>
												</div>
											</div>
											<div className="experience-form-actions">
												<button type="button" className="btn-small btn-outline" onClick={handleCancelEducationForm}>
													Cancel
												</button>
												<button type="button" className="btn-small btn-solid" onClick={handleSubmitEducation}>
													Save education
												</button>
											</div>
										</div>
									)}

									{educations.map((education, index) => (
										<div className="education-item" key={`${education.degree}-${index}`}>
											<div className="education-header">
												<div className="education-icon"><FiBook size={24} /></div>
												<div>
													<h3>{education.degree}</h3>
													<p className="education-school">{education.school}</p>
												</div>
											</div>
											<div className="education-details">
												<span><FiAward size={14} /> {education.graduation || education.endYear || ""}</span>
												{education.level ? <span><FiBook size={14} /> {education.level}</span> : null}
											</div>
											<div className="education-actions">
												<button type="button" className="btn-small" onClick={() => handleEditEducation(index)}>
													<FiEdit2 size={14} /> Edit
												</button>
												<button type="button" className="btn-small" onClick={() => handleRemoveEducation(education.id)}>
													<FiTrash2 size={14} /> Remove
												</button>
											</div>
										</div>
									))}
								</div>
							</>
						)}

						{/* Experience Tab */}
						{activeTab === "experience" && (
							<div className="profile-section">
								<h2 className="section-title">Work Experience</h2>
								{experiences && experiences.length > 0 ? (
									<>
										{experiences.map((experience, index) => (
											<div className="experience-item" key={`${experience.title}-${index}`}>
												<div className="experience-header">
													<div className="experience-icon"><FiBriefcase size={24} /></div>
													<div>
														<h3>{experience.title}</h3>
														<p className="experience-company">{experience.company}</p>
													</div>
													</div>
													<div className="experience-details">
														<span><FiActivity size={14} /> {experience.period}</span>
														{experience.duration ? <span>{experience.duration}</span> : null}
														{experience.location ? <span><FiMapPin size={14} /> {experience.location}</span> : null}
													</div>
													<p className="experience-description">{experience.description}</p>
													<div className="experience-actions">
														<button type="button" className="btn-small" onClick={() => handleEditExperience(index)}>
															<FiEdit2 size={14} /> Edit
														</button>
														<button type="button" className="btn-small" onClick={() => handleRemoveExperience(experience.id)}>
															<FiTrash2 size={14} /> Remove
														</button>
													</div>
												</div>
										))}
									</>
								) : (
									<div className="jobs-empty-state">
										<h3>No work experiences added</h3>
										<p className="empty-state-copy">Summary from profile:</p>
										<ul>
											<li><strong>Preferred category:</strong> {profileData.preferredJobCategory || "—"}</li>
											<li><strong>Years of experience:</strong> {profileData.yearsOfExperience || "—"}</li>
											<li><strong>Skills:</strong> {profileData.skills && profileData.skills.length ? profileData.skills.join(", ") : "—"}</li>
										</ul>
										<p className="empty-state-copy">Use <strong>Add experience</strong> on Overview to create entries.</p>
									</div>
								)}
							</div>
						)}

						{/* Education Tab */}
						{activeTab === "education" && (
							<div className="profile-section">
								<h2 className="section-title">Education</h2>
								{educations && educations.length > 0 ? (
									<>
										{educations.map((education, index) => (
											<div className="education-item" key={`${education.degree}-${index}`}>
												<div className="education-header">
													<div className="education-icon"><FiBook size={24} /></div>
													<div>
														<h3>{education.degree}</h3>
														<p className="education-school">{education.school}</p>
													</div>
													</div>
													<div className="education-details">
														<span><FiAward size={14} /> {education.graduation || education.endYear || ""}</span>
														{education.level ? <span><FiBook size={14} /> {education.level}</span> : null}
													</div>
													<div className="education-actions">
														<button type="button" className="btn-small" onClick={() => handleEditEducation(index)}>
															<FiEdit2 size={14} /> Edit
														</button>
														<button type="button" className="btn-small" onClick={() => handleRemoveEducation(education.id)}>
															<FiTrash2 size={14} /> Remove
														</button>
													</div>
												</div>
										))}
									</>
								) : (
									<div className="jobs-empty-state">
										<h3>No education entries added</h3>
										<p className="empty-state-copy">Summary from profile:</p>
										<ul>
											<li><strong>Status:</strong> {profileData.currentStatus || "—"}</li>
											<li><strong>Bio:</strong> {profileData.bio || "—"}</li>
											<li><strong>Skills:</strong> {profileData.skills && profileData.skills.length ? profileData.skills.join(", ") : "—"}</li>
										</ul>
										<p className="empty-state-copy">Use <strong>Add education</strong> on Overview to create entries.</p>
									</div>
								)}
							</div>
						)}

						{/* Resume Tab */}
						{activeTab === "resume" && (
							<div className="profile-section">
								<h2 className="section-title"><FiFileText size={18} /> Resume</h2>
								<div className="resume-upload-box">
									<div className="upload-icon"><FiFileText size={48} /></div>
									{resumeFileName ? (
										<div>
											<p>{resumeFileName}</p>

											<button
												type="button"
												onClick={handleViewResume}
												style={{
													background: "none",
													border: "none",
													color: "#000000",
													cursor: "pointer",
													textDecoration: "underline",
													padding: 0,
													fontSize: "14px",
													fontWeight: "600",
												}}
											>
												View Resume
											</button>
											<div className="resume-actions" style={{ marginTop: "12px", display: "flex", gap: "8px" }}>
												<button
													type="button"
													className="btn-small btn-outline"
													onClick={handleChangeResume}
												>
													Change
												</button>
												<button
													type="button"
													className="btn-small btn-danger"
													onClick={handleDeleteResume}
												>
													Delete
												</button>
											</div>
										</div>
									) : (
										<p>No resume uploaded</p>
									)}
									<button
										className="btn-upload"
										type="button"
										onClick={() => {

											if (!resumeFile) {

												resumeInputRef.current?.click();

											} else {

												handleResumeUpload();

											}
										}}
									><FiUpload size={16} /> Upload Resume
									</button>
									<input
										ref={resumeInputRef}
										type="file"
										accept=".pdf,.doc,.docx"
										onChange={async (e) => {

											const file = e.target.files[0];

											if (file) {

												setResumeFile(file);

												setResumeFileName(file.name);

												await handleResumeUpload();

											}
										}}
										style={{ display: "none" }}
									/>
									<p className="upload-note">Accepted formats: PDF, DOCX · Max file size: 5 MB</p>
								</div>
							</div>
						)}

						{/* Account Tab */}
						{activeTab === "account" && (
							<div className="profile-section">
								<h2 className="section-title"><FiHeart size={18} /> Account</h2>
								<div className="account-field">
									<label>Email address</label>
									<p>{profileData.email || "email@example.com"}</p>
								</div>
								<div className="account-field">
									<label>Account role</label>
									<p>Job Seeker <span className="active-badge">Active</span></p>
								</div>
								<div className="account-field">
									<label>Date joined</label>
									<p>January 10, 2025</p>
								</div>
							</div>
						)}
					</div>

					{/* Right Sidebar */}
					<aside className="profile-sidebar">
						<button className="btn-save-changes" onClick={handleSaveChanges}>
							<FiSave size={16} /> Save changes
						</button>

						<div className="sidebar-card">
							<h3 className="card-title">Profile strength</h3>
							<div className="strength-percentage">50%</div>
							<div className="strength-bar">
								<div className="strength-fill" style={{ width: "50%" }}></div>
							</div>
							<p className="strength-label">Good</p>
							<ul className="strength-checklist">
								<li className="completed"><FiCheck size={14} /> Basic information complete</li>
								<li><FiCircle size={14} /> Skills added</li>
								<li><FiCircle size={14} /> Resume uploaded</li>
								<li><FiCircle size={14} /> Work experience added</li>
								<li><FiCircle size={14} /> Add a profile photo</li>
								<li><FiCircle size={14} /> Add a bio or summary</li>
							</ul>
						</div>

						<div className="sidebar-card">
							<h3 className="card-title"><FiActivity size={16} /> Activity</h3>
							<div className="activity-grid">
								<div className="activity-item">
									<div className="activity-number">12</div>
									<div className="activity-label">Applications</div>
								</div>
								<div className="activity-item">
									<div className="activity-number">4</div>
									<div className="activity-label">Interviews</div>
								</div>
								<div className="activity-item">
									<div className="activity-number">38</div>
									<div className="activity-label">Profile views</div>
								</div>
								<div className="activity-item">
									<div className="activity-number">7</div>
									<div className="activity-label">Saved jobs</div>
								</div>
							</div>
						</div>
					</aside>
				</div>
			</div>
		</JobSeekerPortalScaffold>
	);
}

export default Profile;
