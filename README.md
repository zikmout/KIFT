# KIFT - Melonf**kers @42born2code

[Project instructions][pdf].

## Getting started

1. [Install Brew][brew]
2. Install custom brew formula

        brew tap watsonbox/cmu-sphinx

3. Install sphinxbase

        brew install --HEAD watsonbox/cmu-sphinx/cmu-sphinxbase

4. Install pocketsphinx

        brew install --HEAD watsonbox/cmu-sphinx/cmu-pocketsphinx


## Recording into .raw file

1. Install sox

        brew install sox

2. Record

        rec --bits 16 --encoding signed-integer --endian little -c 1 record-voice.raw

3. (Optional) Test if the .raw file you just generated sounds good by converting it to .wav:

        sox -r 44100 -e unsigned -b 8 -c 1 RAW_FILE_SRC.raw WAV_FILE_DST.wav

    Then open it using itunes:

        open WAV_FILE_DST.wav

## Testing the web client

You'll find the code for the web client at `./app`

### Database configuration

We're using the free version of MongoLab to host our database.

1. Go to [their website](https://mlab.com/)
2. Sign up for a free account
3. Create a new MongoDB Deployment (not a Private Environment)
4. Here are the configurations:

        Cloud Provider: Amazon web services
                Region: US East (Virginia) (us-east-1)
        Plan: Single-node
                Standard Line: Sandbox
                High Storage Line: `ignore this part`
        Database Name: kift
5. Go to https://mlab.com/databases/kift#users (assuming you called the database `kift`)
6. Click on `Add database user`
7. Create a user for your database (remember the credentials)
8. Create a `.env` file in the app's root directory

       touch .env
9. Enter the app's root directory and add this line to the `.env` file

        DB_PATH=mongodb://<dbuser>:<dbpassword>@ds119772.mlab.com:19772/kift
10. Replace \<dbuser\> and \<dbpassword\> respectively by the username and password you just created


## Running the app

1. Enter the `app` directory and install the dependencies:

        cd app
        npm install

2. Run the server

        npm start

Now check out the website at [http://localhost:3000](http://localhost:3000)

That's it! Refer to the rest of the team if you have more questions.

## Resources

More is Code: http://www.moreiscode.com/getting-started-with-cmu-sphinx-on-mac-os-x/
CMU Sphinx:
  * https://cmusphinx.github.io/wiki/tutorialbeforestart/
  * https://cmusphinx.github.io/wiki/tutorialpocketsphinx/

[pdf]: https://github.com/R4meau/KIFT/blob/master/kift.pdf
[brew]: https://github.com/all-hack/42moonlight/blob/master/resources/install_brew_fileuser.md
