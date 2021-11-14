/* ---------------------------
File : MainActivity.tk
Authors : Ryan Sauge
Date : 14.11.2021
Purpose : Starts a new activity when the user clicks on the button and retrieves its result
--------------------------- */

package ch.heigvd.iict.sym.android_activity

import android.app.Activity
import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.widget.Button
import android.widget.TextView
import androidx.activity.result.contract.ActivityResultContracts

class MainActivity : AppCompatActivity() {
    private val getResult =
        registerForActivityResult(
            ActivityResultContracts.StartActivityForResult()
        ) {
            if (it.resultCode == Activity.RESULT_OK) {
                val value = it.data?.getStringExtra(ExtraSecondActivity)
                val text: TextView = findViewById(R.id.textViewResult)
                text.setText(value)
            }
        }
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        val button = findViewById<Button>(R.id.button)

        // operations to be performed
        // when user tap on the button
        button?.setOnClickListener()
        {
            val intent = Intent(this, SecondActivity::class.java)
            getResult.launch(intent)
        }


    }

    companion object {
       const val ExtraSecondActivity = "resultSecond"
    }
}