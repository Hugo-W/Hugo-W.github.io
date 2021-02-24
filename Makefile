sync:
	rsync -avm --include='*Project.md' --include='*/' --exclude='*' /mnt/f/surfdrive/01_PostDoc_Projects/ ./perso/projects/
	cp /mnt/f/surfdrive/02_SupervisedProjects/Ryan-compositionality/composition/idea.md ./perso/projects/Compositionality/Ryan/Project.md
	rsync -avm --include='*.png' --include='*/' --exclude='*' /mnt/f/surfdrive/01_PostDoc_Projects/*/figures/ ./assets/
doc:
	sed -i 's/\(\.\?\/\?figures\)\//\/assets\//g' perso/projects/03_PhaseTRF/Project.md 
	sed -i 's/\(\.\?\/\?figures\)\//\/assets\//g' perso/projects/02_Networks/Project.md 
	sed -i 's/\(\.\?\/\?figures\)\//\/assets\//g' perso/projects/01_PredictiveCodingforSpeech/Project.md 
	sed -i 's/\(\.\?\/\?figures\)\//\/assets\//g' perso/projects/Compositionality/Project.md 
	sed -i 's/\(\.\?\/\?figures\)\//\/assets\//g' perso/projects/MOUS_TRFs/Project.md 
	#for file in ls perso/projects/*/*md; do pandoc -c assets/custom.css -s $file -t html --mathjax -o _site/$(dirname $file)/$(basename -s.md $file).html; done
	pandoc -c /assets/custom.css -s -B _includes/banner.html -A _includes/footer.html "perso/projects/Compositionality and CompModel/Project.md" -t html --mathjax -o "perso/projects/Compositionality and CompModel/Project.html"
	pandoc -c /assets/custom.css -s -B _includes/banner.html -A _includes/footer.html perso/projects/Compositionality/Ryan/Project.md -t html --mathjax -o perso/projects/Compositionality/Ryan/Project.html
	pandoc -c /assets/custom.css -s -B _includes/banner.html -A _includes/footer.html perso/projects/MOUS_TRFs/Project.md -t html --mathjax -o perso/projects/MOUS_TRFs/Project.html
	pandoc -c /assets/custom.css -s -B _includes/banner.html -A _includes/footer.html perso/projects/03_PhaseTRF/Project.md -t html --mathjax -o perso/projects/03_PhaseTRF/Project.html
	pandoc -c /assets/custom.css -s -B _includes/banner.html -A _includes/footer.html perso/projects/02_Networks/Project.md -t html --mathjax -o perso/projects/02_networks/Project.html
	pandoc -c /assets/custom.css -s -B _includes/banner.html -A _includes/footer.html perso/projects/01_PredictiveCodingforSpeech/Project.md -t html --mathjax -o perso/projects/01_PredictiveCodingforSpeech/Project.html
	pandoc -c /assets/custom.css -s -B _includes/banner.html -A _includes/footer.html perso/projects/NLP/Project.md -t html --mathjax -o perso/projects/NLP/Project.html

encrypt:
	gulp firewall-nowatch

all: sync doc encrypt
