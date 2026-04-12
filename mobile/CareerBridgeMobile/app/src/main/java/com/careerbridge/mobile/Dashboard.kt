package com.careerbridge.mobile

import android.content.Intent
import android.os.Bundle
import android.widget.Button
import android.widget.TextView
import androidx.activity.enableEdgeToEdge
import androidx.appcompat.app.AppCompatActivity

class DashboardActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContentView(R.layout.dashboard_activity)

        val tvWelcome = findViewById<TextView>(R.id.tvWelcome)
        val logoutBtn = findViewById<Button>(R.id.btnLogout)

        // Optional: display email
        val prefs = getSharedPreferences("APP", MODE_PRIVATE)
        val token = prefs.getString("TOKEN", null)

        tvWelcome.text = "Welcome to CareerBridge 🎉"

        logoutBtn.setOnClickListener {
            // clear token
            prefs.edit().clear().apply()

            // go back to login
            startActivity(Intent(this, LoginActivity::class.java))
            finish()
        }
    }
}