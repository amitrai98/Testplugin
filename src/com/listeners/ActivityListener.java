package com.listeners;

/**
 * Created by amandeepsingh on 27/4/16.
 */
public interface ActivityListener {

    void onPauseActivity();
    void onResumeActivity();
    void onStoppedActivity();
    void onDestroyActivity();
    void onRequestAccessed();
}
