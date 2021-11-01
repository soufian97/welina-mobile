
![alt text](https://i.imgur.com/HCmP4qq.png)


# Welina mobile application

Welina a mobile application, is well-placed in the expectation of the realization of the first digital multiplatform solution that will interconnect surfers with professional coaches.
this application consists of three main workflow (guest mode, surfer process and coach process).
### The Guest Process:
- Navigation as a guest in the application: discover the offers and see their details, learn about the coaches (his experiences and qualifications in the field, his languages, his social networks and his gallery).
- Learn about the application, its goals and its working method.
- Contact Welina service.
- Register for other further features.
### The surfer process:
- After authentication, the user has the same functionality as a guest with the right to reserve the offers offered by the coaches.
- View his list of upcoming, past and cancelled offers.
- Provide feedback and assessment on session's quality offered by the coach.
- Apply as a coach, his request will be processed by Welina service.
### The coach process:
- After admission to the Welina team, he can feed/update his profile with his gallery and information.
- Create offers.
- Check his calendar for his next sessions.
- Confirm, cancel or ask for reschedule a requests.
- Leave an opinion and assessment on the client's behavior.

## Requirements

Welina `react native` mobile application use some high api level such as image picker and compression. in order that application works properly:
<br/>
Min Android SDK version:
- Android 8.0 (API level 26)

Min IOS version:
  - IOS 10.0

## Project structure
The application’s root directory contains the different configuration files, as well as
the app folder.


![alt text](https://i.imgur.com/DA8ExHD.png)

The above image show us our project's folder structure, starting with `android` and `ios` who represent the primary entry point to native codes respectively `java` and `swift`.

Next we have the app folder, it's considered as the main entry to our `javaScript` code. it's structured 6 folders that each one play a specific role in our architecture:
* *assets*:
  We opt in this directory to organize all our shared files like `fonts`, `images` and `svgs`.
* *components*:
  Components is the place where we put all our components that are reusable several times
  on several places of the application, like buttons and form's inputs for example.
* *config*:
  As its name suggest, it's our configuration files shelter like api and i18n config.
* *containers*:
  On this folder we put all of our screens directories that each one composed of the following elements:
  <br/>- **index.js**: entry point of the container, this is the js file loaded when we want to access the container.
  <br/>- **style.js**: file where we put all of our styling props for the current screen.
  <br/>- **messages.js**: in order to internationalize our application we put the text objects into this file that will be compiled to translations files.
  <br/>- **store**:Store folder contains your redux store configurations,redux-saga config and reducers config.
* *translations*:
  Translations folder contains your react-intl extracted and compiled files.
* *utils*:
  Utils contains all the global utility functions, shared by all the app.

## Basic concepts
1. *React Native*: React Native is an open source mobile application framework created by
   Facebook. It is used to develop apps for Android, iOS by allowing
   developers to use React with the native features of these platforms...
2. *Redux*: state management tool used with React state and React context to manage
   changes that occur in the app as well as the call for actions that trigger
   API calls

3. *Redux-saga* : tool that allows listening to Redux actions and making the call and management
   of APIs
4. *React navigation*: it allows the management of the 'routing' and navigation in the application.
5. *React intl* : for managing the translation of text within the application.
6. *fetch* : provides an easy and logical way to retrieve resources across the
   asynchronous manner

## Welina technical architecture schema

![alt text](https://imgur.com/6irG65c.png)

We opted for the React native, React-redux, Redux-saga architecture, because it not only allows a good management of the states and data of the components, but it also allows a good management and communication with the services(API).
In this architecture, the user’s interaction with the interface (one or more components react native), triggers an event that in turn triggers an action that changes the state (data) of the component with which the user interacts, which updates it.
Everything about communication with the services is done through redux-saga, it allows to manage the consumption of APIs and also the side effects that can produce an action.
The Store contains the overall state of the application data. The Reducer is the intermediary that determines what each action must do and updates the blind accordingly.

# **Welina deployment**

**Deployment**

**IOS**

Step 1: Get your app ready to deploy `Welina`. go ahead to the root directory and run command **npm install**.

Once the command **npm install** executed successfully then change the directory using **cd ios** command to ios directory and run command **pod install**.

If both these commands executed successfully now it&#39;s time to build our app. Step 2: Build the app in XCode

Now open your project folder in Xcode then navigate to ios directory and select the file which has extension .xcworkspace. Now it&#39;s time to change some settings.

1. Update General settings

Click on General tab and navigate to identity and increase the build number in **welina**.

2. Change scheme if you are in debug mode.

Once the initial settings are updated and if the app in debug mode, then navigate to the top of the Xcode select Product → Scheme → Edit Scheme

Now change Build configuration to Release and do the same for Test, Profile, Analyze and Archive tabs and close the popup.

3. Run app in the emulator or real device

You should run the app in the emulator or real device, so you should navigate to top and choose **welina** then select your device emulator or real device (real device should be connected to mac) then run the build by clicking play button and the app will be going to launch in the respective device.

4. Archive the App

After running the app into your real phone or your emulator, you have now to go the **welina** in the top and select Any iOS Device (armv7, arm64).

After that you have to go to the top menu and choose Product → Archive.

Step 3: Release the app on the App store in test flight mode

Now we are very close to deploying the app on App Store. In App store Test Flight is the mode where you can test your app in iPhone device. In this following step we are going to release our app on App Store in test mode.

Once the app is successfully archived you will see a list of apps with the version in Xcode Organizer select this app click on the Distribute App.

Now you&#39;ll see methods of distribution select App Store Connect and click on next

• Now here you will see two method Upload or export as we are going to upload app so select upload and click next.


• Now you will see three more options which are by default selected leave them as it is and click next.



• Now its time to select certificates which we have created before as we are going to distribute this app on production so here we need to select certificates one for distribution and another one is for production. In my case I choose Automatically manage signing so Xcode will be in charge of choosing the right certificates.

• Once you clicked next it will take little time to identify your certificates and after that, you will see little details of your app which we are going to upload on the app store.


• Now click Upload to upload your app on App Store, and it will take a little time to upload the app on app store. Once the app is uploaded click on done and now it&#39;s time to login in App store or iTunes account.

• Once your app is uploaded on test flight after that login to your app store account and click My Apps and navigate to your app → Test Flight and here you will see your app with processing tag.


• Once the processing is complete then you will see a warning icon like mentioned in image click on &#39; **Gérer&#39;**.


• Now a pop up will appear which will ask you about Export Certifications, in our case we don&#39;t use any encryption algorithm, so we&#39;ll choose **No** and then click **Next**. Then your internal testers can test the application now.

Step 5: Move Your App from Test Flight to Production

• So now it&#39;s time to move your app to the production so your app will be going to be available for your users following are the steps that how you can move your app from test fight to production.

• First login to your App Store account and navigate to Welina Mobile and click on App Store Tab.

1. If you are uploading fresh App on App Store

• If you are Uploading your app first time, then you will see 1.0 Prepare for Submission in the left sidebar under iOS App click on it


2. Fill out App details and select build

• Here you will see a screen where you have to fill out all the information about the app.• So its time to select the build which we have uploaded on test flight. Scroll down and you will find a Build tab click on Select a build before you submit your app and a pop up will appear with all the uploaded apps on test flight.


• Click on the app version which you want to move to the production and click on done. Now fill out all the information of your app including screenshots.

3. Version release

• Once you fill out all the details of app then in version release tab you can choose how you want to release your app.


• So now it&#39;s time to submit your app so click on Save button and after that click on Save for Review from the top right corner.

• After that app store will ask you that is your app has advertisements or not after selecting it click on Submit for review and your app is under review now. Now times taken in the review process depends on App store. Once your app is reviewed successfully then app is going to be move on production.

**Android**

a concise list of deployment steps with the assumption that Android Studio is installed

**\*TIP:** if for some reason, the below steps don&#39;t seem to work, try to reset all the project dependencies

1. deleting the _package-lock.json_ file and _node-modules_ folder;

2. then re-install node modules using `npm install`.

First off, react-native has **very good** documentation to follow, with possibly just the difference of few android studio configurations out of it.

Make sure you follow the documentation to generate Keys that will have to be used for every release and match across all the versions :

1. In android/app/build.gradle (Module: app) in **defaultConfig** object

increment **versionCode and versionName only.**

_\*make sure that other settings in defaultConfig (such as applicationId) and all of the_ _signinConfigs (such as keyAlias, keyPassword, and others ) stays the same through-out the_ _versions of the app as they are cross-referenced: if something doesn&#39;t match, the app does not_ _get uploaded._

2. After build version is changed you need to sync build.gradle file with project:

• go to File \&gt; Sync Project with Gradle Files

• Go to Build \&gt; Rebuild Project

3. Check that Run Settings have the device set up:

Open Run settings Run…

4. in your emulator/physical USB device make sure any old app version are uninstalled/deleted as this often produces conflicts when building new version on the device

5. To rebuild, first, start rebuilding the JSX part (react-native code).

_Make sure the following command opens a terminal process window (and previous terminal processes are closed )._ From project root, in your terminal run _&#39;react-native run-android -- variant=release&#39;._

_\*Variant=release notes production setting. you can change those to &#39;-- variant=debug&#39;_

if successful to 100%, this generates **app-release.apk** file, you can find it at android/app/build/outputs/apk/release/apk-release

_\*potential source of confusion: android studio build generates a different app-release.apk file and stores it in a different location, make sure you find the right one :)_

6. now go to play.google.com/apps/publish console, press CREATE APPLICATION, or &#39;Manage&#39; existing application to update


7. go to Release management \&gt; App releases \&gt; Alpha or Beta or Production section, press `create release/edit release`.


**8. Upload the app-release.apk** from the correct folder (react-native generates one, android studio generates one as well, but in a different locations, see step 5)

choose Alpha, Beta or Production sections. You can always &#39;upgrade&#39; alpha into Beta, into Production.


10. give reason for release of new version description between the <en-GB> </en-GB> tags at the bottom of page

11. &#39;Save&#39; and then &#39;Review&#39; .


If it is a totally new app and &#39;Review&#39; is deactivated for no apparent reason:

12. Fill out store presence, copyright and other tabs with grey circles until the sections reach publishable (green circle) status.


Make the grey circles go green by filling out and uploading minimum required fields /graphics

And that&#39;s it! Android doesn&#39;t review the apps as Apple do, so you would see the alpha/beta/production app ready in 22–30 min.


  







