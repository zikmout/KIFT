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





## Resources

More is Code: http://www.moreiscode.com/getting-started-with-cmu-sphinx-on-mac-os-x/
CMU Sphinx:
  * https://cmusphinx.github.io/wiki/tutorialbeforestart/
  * https://cmusphinx.github.io/wiki/tutorialpocketsphinx/

[pdf]: https://github.com/R4meau/KIFT/blob/master/kift.pdf
[brew]: https://github.com/all-hack/42moonlight/blob/master/resources/install_brew_fileuser.md
