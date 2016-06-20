package com.listeners;

import com.opentok.android.OpentokError;
import com.opentok.android.Stream;

/**
 * Created by amandeepsingh on 26/4/16.
 */
public interface SessionListeners {
    void onStreamDrop(Stream stream);
    void onVideoViewChange(boolean hasBothVideo);
    void onCallConnected();

    void onCallDisconnected();
    void onCallRejected();
    void onCallEnded();
    void onReciverInitialized();
    void onCallerInitialized();
    void onReceiverInitialized();
    void onCallStarted();
    void onCallEndBeforeConnect();
    void onCallEndByReceiver();
    void onError(OpentokError error);

}
