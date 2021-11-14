/* ---------------------------
File : SecondActivity.tk
Authors : Ryan Sauge
Date : 14.11.2021
Purpose : Generate a random int and store it in an extra
--------------------------- */

package ch.heigvd.iict.sym.android_activity

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import kotlin.random.Random

class SecondActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_2)

        /*
        Generate a random int
         */
        val result: Int = Random.nextInt(0, 100)

        /*
            Start a new Intent and pass the result to him
         */
        val resultIntent = Intent()
        resultIntent.putExtra(MainActivity.ExtraSecondActivity, result.toString())
        setResult(RESULT_OK, resultIntent)
        finish()
    }
}