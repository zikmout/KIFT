
./sphinx_fe -argfile en-us/feat.params -samprate 16000 -c ../audio/$1/instruction.fileids -di . -do . -ei wav -eo mfc -mswav yes
./bw -hmmdir en-us -moddeffn en-us/mdef.txt -ts2cbfn .cont. -feat 1s_c_d_dd -cmn current -agc none -lda en-us/feature_transform -dictfn cmudict-en-us.dict -ctlfn ../audio/$1/instruction.fileids -lsnfn ../audio/$1/instruction.transcription -accumdir .
cp -a en-us en-us-adapt
./map_adapt  -moddeffn en-us/mdef.txt  -ts2cbfn .ptm.  -meanfn en-us/means  -varfn en-us/variances  -mixwfn en-us/mixture_weights  -tmatfn en-us/transition_matrices  -accumdir .  -mapmeanfn en-us-adapt/means  -mapvarfn en-us-adapt/variances  -mapmixwfn en-us-adapt/mixture_weights  -maptmatfn en-us-adapt/transition_matrices
./mk_s2sendump  -pocketsphinx yes  -moddeffn en-us-adapt/mdef.txt  -mixwfn en-us-adapt/mixture_weights  -sendumpfn en-us-adapt/sendump
