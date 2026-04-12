package com.careerbridge.mobile

import RegisterRequest
import android.content.Intent
import android.os.Bundle
import android.widget.*
import androidx.activity.enableEdgeToEdge
import androidx.appcompat.app.AppCompatActivity
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class RegisterActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContentView(R.layout.register_activity)

        val continueBtn = findViewById<Button>(R.id.btnContinue)
        val firstName = findViewById<EditText>(R.id.etFirstName)
        val lastName = findViewById<EditText>(R.id.etLastName)
        val email = findViewById<EditText>(R.id.etEmail)
        val password = findViewById<EditText>(R.id.etPassword)
        val confirmPassword = findViewById<EditText>(R.id.etConfirmPassword)

        continueBtn.setOnClickListener {

            val fName = firstName.text.toString()
            val lName = lastName.text.toString()
            val emailStr = email.text.toString()
            val pass = password.text.toString()
            val confirmPass = confirmPassword.text.toString()

            // ✅ Validation
            if (fName.isEmpty() || lName.isEmpty() || emailStr.isEmpty() || pass.isEmpty()) {
                Toast.makeText(this, "Fill all fields", Toast.LENGTH_SHORT).show()
                return@setOnClickListener
            }

            if (pass != confirmPass) {
                Toast.makeText(this, "Passwords do not match", Toast.LENGTH_SHORT).show()
                return@setOnClickListener
            }

            val fullName = "$fName $lName"

            val request = RegisterRequest(
                fullName,
                emailStr,
                pass,
                "JOB_SEEKER"
            )

            // ✅ API Call
            RetrofitClient.api.register(request).enqueue(object : Callback<Any> {

                override fun onResponse(call: Call<Any>, response: Response<Any>) {
                    if (response.isSuccessful) {

                        Toast.makeText(this@RegisterActivity, "Registered!", Toast.LENGTH_SHORT).show()

                        // ✅ Redirect to Login
                        val intent = Intent(this@RegisterActivity, LoginActivity::class.java)
                        intent.putExtra("email", emailStr) // optional autofill
                        startActivity(intent)

                        finish()
                    } else {
                        Toast.makeText(this@RegisterActivity, "Register failed", Toast.LENGTH_SHORT).show()
                    }
                }

                override fun onFailure(call: Call<Any>, t: Throwable) {
                    Toast.makeText(this@RegisterActivity, t.message, Toast.LENGTH_LONG).show()
                }
            })
        }
    }
}