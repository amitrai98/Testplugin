/*
       Licensed to the Apache Software Foundation (ASF) under one
       or more contributor license agreements.  See the NOTICE file
       distributed with this work for additional information
       regarding copyright ownership.  The ASF licenses this file
       to you under the Apache License, Version 2.0 (the
       "License"); you may not use this file except in compliance
       with the License.  You may obtain a copy of the License at

         http://www.apache.org/licenses/LICENSE-2.0

       Unless required by applicable law or agreed to in writing,
       software distributed under the License is distributed on an
       "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
       KIND, either express or implied.  See the License for the
       specific language governing permissions and limitations
       under the License.
 */

package com.ringhop;

import android.content.pm.PackageManager;
import android.os.Bundle;

import com.listeners.ActivityListener;

import org.apache.cordova.*;

public class MainActivity extends CordovaActivity
{
    private ActivityListener mActivityListener;
    @Override
    public void onCreate(Bundle savedInstanceState)
    {
        super.onCreate(savedInstanceState);
        // Set by <content src="index.html" /> in config.xml

        super.init();
        loadUrl(launchUrl);
    }

    public void setActivityListener(ActivityListener listener) {
        mActivityListener = listener;
    }


    @Override
    protected void onPause() {
        super.onPause();

        if (mActivityListener != null) {
            mActivityListener.onPauseActivity();
        }
    }

    @Override
    protected void onStop() {
        super.onStop();
        if (mActivityListener != null) {
            mActivityListener.onStoppedActivity();
        }
    }

    @Override
    public void onDestroy() {
        if (mActivityListener != null) {
            mActivityListener.onDestroyActivity();
        }
        super.onDestroy();
    }

    @Override
    protected void onResume() {
        super.onResume();
        if (mActivityListener != null) {
            mActivityListener.onResumeActivity();
        }
    }

    @Override
    public void onRequestPermissionsResult(int requestCode, String[] permissions, int[] grantResults) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults);

        switch (requestCode) {
            case 100: {
                // If request is cancelled, the result arrays are empty.
                if (grantResults.length > 0) {
                    for(int i = 0; i<grantResults.length;i++)
                    {
                        if(grantResults[i] != PackageManager.PERMISSION_GRANTED)
                        {
                            return;
                        }
                    }
                    mActivityListener.onRequestAccessed();

                } else {
                }
                return;
            }
        }

    }
}
