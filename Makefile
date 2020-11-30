sync:
	rsync -avm --include='*Project.md' --include='*/' --exclude='*' /mnt/f/surfdrive/PostDoc_Projects/ ./perso/projects/
	cp /mnt/f/surfdrive/Shared/composition/idea.md ./perso/projects/Compositionality/Ryan/Project.md
	rsync -avm --include='*.png' --include='*/' --exclude='*' /mnt/f/surfdrive/PostDoc_Projects/*/figures/ ./assets/
doc:
	sed -i 's/\(\.\?\/\?figures\)\//\/assets\//g' perso/projects/PhaseTRF/Project.md 
	sed -i 's/\(\.\?\/\?figures\)\//\/assets\//g' perso/projects/Compositionality/Project.md 
	sed -i 's/\(\.\?\/\?figures\)\//\/assets\//g' perso/projects/MOUS_TRFs/Project.md 
	#for file in ls perso/projects/*/*md; do pandoc -c assets/custom.css -s $file -t html --mathjax -o _site/$(dirname $file)/$(basename -s.md $file).html; done
	pandoc -c /assets/custom.css -s -B _includes/banner.html -A _includes/footer.html perso/projects/Compositionality/Project.md -t html --mathjax -o perso/projects/Compositionality/Project.html
	pandoc -c /assets/custom.css -s -B _includes/banner.html -A _includes/footer.html perso/projects/Compositionality/Ryan/Project.md -t html --mathjax -o perso/projects/Compositionality/Ryan/Project.html
	pandoc -c /assets/custom.css -s -B _includes/banner.html -A _includes/footer.html perso/projects/MOUS_TRFs/Project.md -t html --mathjax -o perso/projects/MOUS_TRFs/Project.html
	pandoc -c /assets/custom.css -s -B _includes/banner.html -A _includes/footer.html perso/projects/PhaseTRF/Project.md -t html --mathjax -o perso/projects/PhaseTRF/Project.html
	pandoc -c /assets/custom.css -s -B _includes/banner.html -A _includes/footer.html perso/projects/NLP/Project.md -t html --mathjax -o perso/projects/NLP/Project.html

encrypt:
	gulp firewall-nowatch

all: sync doc encrypt
