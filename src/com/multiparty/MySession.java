package com.multiparty;

import android.content.Context;
import android.util.Log;
import android.view.View;
import android.view.ViewGroup;
import android.widget.RelativeLayout.LayoutParams;

import com.listeners.SessionListeners;
import com.opentok.android.BaseVideoRenderer;
import com.opentok.android.Connection;
import com.opentok.android.OpentokError;
import com.opentok.android.Publisher;
import com.opentok.android.Session;
import com.opentok.android.Stream;
import com.opentok.android.Subscriber;

import java.util.HashMap;

public class MySession extends Session {

    private final SessionListeners mSessionListener;
    private Context mContext;

    // Interface
    private ViewGroup mSubscribersViewContainer;
    private ViewGroup mPreview;

    // Players Status
    private MySubscriber mSubscriber;
    private HashMap<Stream, MySubscriber> mSubscriberStream = new HashMap<Stream, MySubscriber>();
    private HashMap<String, MySubscriber> mSubscriberConnection = new HashMap<String, MySubscriber>();

    private Publisher mPublisher;
    private View mPublisherView;
    private View mSubscriberView;
    private View mNullView;


    public static boolean CALL_CONNECTED = false;
    public static boolean CALL_STARTED= false;
    public static boolean CALL_ENDED = false;
    public static boolean CALL_REJECTED = false;
    private boolean mCaller = false;

    private final String TAG = getClass().getSimpleName();


    public MySession(Context context, SessionListeners listeners, String apiKey, String sessonId, boolean mCaller) {
        super(context, apiKey, sessonId);
        this.mContext = context;
        this.mSessionListener = listeners;
        this.mCaller = mCaller;
    }

    // public methods
    public void setPlayersViewContainer(ViewGroup container) {
        this.mSubscribersViewContainer = container;
//        this.mSubscribersViewContainer.setAdapter(mPagerAdapter);
//        mPagerAdapter.notifyDataSetChanged();
    }

    public void setPreviewView(ViewGroup preview) {
        this.mPreview = preview;
    }

//    public void connect() {
//        this.connect(Constants.TOKEN);
//    }

    // callbacks
    @Override
    protected void onConnected() {

        CALL_CONNECTED = true;

        mSessionListener.onCallConnected();

        mPublisher = new Publisher(mContext, "MyPublisher");
        publish(mPublisher);

        // Add video preview
        LayoutParams lp = new LayoutParams(
                LayoutParams.MATCH_PARENT, LayoutParams.MATCH_PARENT);
        mPublisherView = mPublisher.getView();
        mPreview.addView(mPublisher.getView(), lp);
        mPublisher.setStyle(BaseVideoRenderer.STYLE_VIDEO_SCALE, BaseVideoRenderer.STYLE_VIDEO_FILL);

//        presentText("Welcome to OpenTok Chat.");
    }

    @Override
    protected void onStreamReceived(Stream stream) {

        CALL_STARTED = true;

        mSessionListener.onCallStarted();

        MySubscriber p = new MySubscriber(mContext, stream);
        // we can use connection data to obtain each user id
        p.setUserId(stream.getConnection().getData());
        p.setStyle(BaseVideoRenderer.STYLE_VIDEO_SCALE, BaseVideoRenderer.STYLE_VIDEO_FILL);

        // Subscribe to this player
        this.subscribe(p);
        mSubscriber = p;
        mSubscriberStream.put(stream, p);
        mSubscriberConnection.put(stream.getConnection().getConnectionId(), p);

        mSubscriberView = p.getView();
        mSubscribersViewContainer.addView(mSubscriberView);
//        p.setSubscribeToVideo(true);
        mSessionListener.onCallConnected();
    }

    @Override
    protected void onStreamDropped(Stream stream) {
//        MySubscriber p = mSubscriberStream.get(stream);
//        if (mSubscriber != null) {
////            mSubscribers.remove(p);


        if(CALL_STARTED)
            mSessionListener.onCallEnded();
        else
            mSessionListener.onCallRejected();

        mSubscriberStream.remove(stream);
        mSubscriberConnection.remove(stream.getConnection().getConnectionId());
        mSessionListener.onStreamDrop(stream);
    }

    @Override
    protected void onSignalReceived(String type, String data,
                                    Connection connection) {
        Log.e(TAG , "signal received");
    }

    public void hideVideo() {
        mPublisher.setPublishVideo(!mPublisher.getPublishVideo());
        if (mPublisher.getPublishVideo()) {
            mPublisherView.setVisibility(View.VISIBLE);
        } else {
            mPublisherView.setVisibility(View.INVISIBLE);
        }

//        if (!mPublisher.getPublishVideo()) {
//            mPreview.removeView(mPublisherView);
//        } else {
//            LayoutParams lp = new LayoutParams(
//                    LayoutParams.MATCH_PARENT, LayoutParams.MATCH_PARENT);
//            if(mPreview.getChildCount()==0) {
//             Log.e("ChildCount","Child is 0");
//                mPublisher.setPublishVideo(true);
//                mPreview.addView(mPublisher.getView(), lp);
//                mPublisher.setPublishVideo(true);
//            }
//        }
    }

    public void muteMic() {
        if (mPublisher != null) {
            mPublisher.setPublishAudio(!mPublisher.getPublishAudio());
        }
    }

    @Override
    protected void onStreamHasVideoChanged(Stream stream, int hasVideo) {
        super.onStreamHasVideoChanged(stream, hasVideo);

        if (mPublisher.getStream().toString().equalsIgnoreCase(stream.toString())) {
//                if(hasVideo==0)
//                {
//                    mPreview.removeView(mPublisherView);
//                }
//            else{
//                    mPreview.addView(mPublisherView);
//                }
        } else {
            if (hasVideo == 0) {
                mSubscriber.setSubscribeToVideo(false);
                mSubscribersViewContainer.removeView(mSubscriberView);
                mPreview.removeView(mPublisherView);
                mSubscribersViewContainer.addView(mPublisherView);
            } else {
                mSubscriber.setSubscribeToVideo(true);
                if (mSubscribersViewContainer.getChildAt(mSubscribersViewContainer.getChildCount() - 1).equals(mPublisherView)) {
                    mSubscribersViewContainer.removeView(mPublisherView);
                }
                mPreview.addView(mPublisherView);
                mSubscribersViewContainer.addView(mSubscriberView);
            }
        }
if(mSubscriber!=null) {
    if (mSubscriber.getSubscribeToVideo() || mPublisher.getPublishVideo()) {
        mSessionListener.onVideoViewChange(true);
//            if(mSubscribersViewContainer.getChildAt(mSubscribersViewContainer.getChildCount()-1).equals(mNullView))
//            {
//                mSubscribersViewContainer.removeView(mNullView);
//            }
    } else {
//            Log.e("ViewAdd","View Added");
//            mSubscribersViewContainer.addView(mNullView);
        mSessionListener.onVideoViewChange(false);
    }
}
    }

    /**
     * check that mic is muted or not
     *
     * @return
     */
    public boolean isMicMuted() {
        return !mPublisher.getPublishAudio();
    }

    /**
     * check that mic is muted or not
     *
     * @return
     */
    public boolean isCameraOn() {
        return mPublisher.getPublishVideo();
    }

    /**
     * swipe Cameras
     */
    public void swipeCamera() {
        mPublisher.swapCamera();
    }

    public Subscriber getSubscriber()
    {
        return mSubscriber;
    }

    @Override
    protected void onConnectionDestroyed(Connection connection) {
        super.onConnectionDestroyed(connection);
        mSessionListener.onCallDisconnected();
    }

    @Override
    protected void onConnectionCreated(Connection connection) {
        super.onConnectionCreated(connection);
        mSessionListener.onReciverInitialized();
    }

    @Override
    protected void onArchiveStarted(String id, String name) {
        super.onArchiveStarted(id, name);
    }

    @Override
    protected void onArchiveStopped(String id) {
        super.onArchiveStopped(id);
    }

    @Override
    protected void onDisconnected() {
        super.onDisconnected();
        if(CALL_STARTED)
            mSessionListener.onCallDisconnected();
        else
            mSessionListener.onCallEndBeforeConnect();

    }

    @Override
    protected void onError(OpentokError error) {
        super.onError(error);
        mSessionListener.onError(error);
    }

    @Override
    public void onPause() {
        super.onPause();
    }

    @Override
    protected void onReconnected() {
        super.onReconnected();
    }

    @Override
    protected void onReconnecting() {
        super.onReconnecting();
    }

    @Override
    public void onResume() {
        super.onResume();
    }


}
