git clone https://github.com/Homebrew/homebrew.git /Volumes/Storage/goinfre/$(whoami)/homebrew
echo 'alias brew="/Volumes/Storage/goinfre/$(whoami)/homebrew/bin/brew"' >> ~/.zshrc
source ~/.zshrc
brew update
brew tap watsonbox/cmu-sphinx
brew install --HEAD watsonbox/cmu-sphinx/cmu-sphinxbase
brew install --HEAD watsonbox/cmu-sphinx/cmu-pocketsphinx
brew install --HEAD watsonbox/cmu-sphinx/cmu-sphinxtrain
