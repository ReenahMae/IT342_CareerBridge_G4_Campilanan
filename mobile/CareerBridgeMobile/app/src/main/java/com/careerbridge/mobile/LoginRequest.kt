data class LoginRequest(
    val email: String,
    val password: String,
    val loginType: String = "manual"
)