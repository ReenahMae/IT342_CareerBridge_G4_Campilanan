package com.careerbridge.mobile

import LoginRequest
import LoginResponse
import android.content.Intent
import android.os.Bundle
import android.widget.*
import androidx.activity.enableEdgeToEdge
import androidx.appcompat.app.AppCompatActivity
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class LoginActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContentView(R.layout.login_activity)

        val loginBtn = findViewById<Button>(R.id.btnLogin)
        val backBtn = findViewById<ImageView>(R.id.ivBack)

        val email = findViewById<EditText>(R.id.etEmail)
        val password = findViewById<EditText>(R.id.etPassword)

        loginBtn.setOnClickListener {

            val request = LoginRequest(
                email.text.toString(),
                password.text.toString(),
                "manual"
            )

            RetrofitClient.api.login(request).enqueue(object : Callback<LoginResponse> {

                override fun onResponse(call: Call<LoginResponse>, response: Response<LoginResponse>) {

                    if (response.isSuccessful) {

                        val token = response.body()?.token

                        val prefs = getSharedPreferences("APP", MODE_PRIVATE)
                        prefs.edit().putString("TOKEN", token).apply()

                        Toast.makeText(this@LoginActivity, "Login Success!", Toast.LENGTH_SHORT).show()

                        startActivity(Intent(this@LoginActivity, DashboardActivity::class.java))
                        finish()

                    } else {
                        Toast.makeText(this@LoginActivity, "Invalid login", Toast.LENGTH_SHORT).show()
                    }
                }

                override fun onFailure(call: Call<LoginResponse>, t: Throwable) {
                    Toast.makeText(this@LoginActivity, t.message, Toast.LENGTH_LONG).show()
                }
            })
        }

        backBtn.setOnClickListener {
            finish()
        }
    }
}