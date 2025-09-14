import{j as e,r as p}from"./vendor-react-DznvRzn3.js";import{B as m}from"./button-CFKFpg6I.js";import{B as w}from"./badge-BVge1mL4.js";import{T as k}from"./TableOfContents-Deo7xpLm.js";import{a as v,b as T,C as L,T as j,c as S,d as A}from"./vendor-icons-UJrtL8Nr.js";import{m as y}from"./vendor-motion-CBaOXxCv.js";import"./vendor-misc-C1uN5dzy.js";import"./ui-core-CcI4ix_a.js";import"./ui-misc-CrjjFLm_.js";import"./vendor-react-remove-scroll-BnG3EeBr.js";import"./vendor-react-remove-scroll-bar-DXUXpKsK.js";import"./vendor-react-style-singleton-CjlfWwut.js";import"./vendor-use-callback-ref-B4ltxk1r.js";import"./utils-styling-CfDMlrKu.js";import"./index-DuwKy9gd.js";import"./vendor--vercel-DmOkmqT6.js";function N({content:g}){const h=c=>{var l;const r=c.split(`
`),s=[];let t=0;for(;t<r.length;){const o=r[t];if(o.startsWith("```")){const a=o.substring(3).trim(),n=[];for(t++;t<r.length&&!r[t].startsWith("```");)n.push(r[t]),t++;t<r.length&&t++;let f=n.join(`
`);if(n.length>0&&n[0].trim()!==""){const x=((l=n[0].match(/^[\t\s]*/))==null?void 0:l[0])||"";x&&n.every(u=>u.startsWith(x)||u.trim()==="")&&(f=n.map(u=>u.substring(x.length)).join(`
`))}let d=a;!d&&f.includes("[Desktop Entry]")&&(d="desktop");let b="text-gray-100";d==="bash"?b="text-purple-400":d==="desktop"&&(b="text-blue-300"),s.push(e.jsx("div",{className:"my-4",children:e.jsxs("div",{className:"bg-gray-900 rounded-lg overflow-hidden",children:[(a||d)&&e.jsx("div",{className:"bg-gray-800 px-4 py-2 text-sm text-gray-300 font-mono border-b border-gray-700",children:a||d}),e.jsx("pre",{className:"p-4 overflow-x-auto",children:e.jsx("code",{className:`text-sm font-mono ${b}`,children:f})})]})},`code-${t}`));continue}let i=o.replace(/`([^`]+)`/g,'<code class="bg-gray-100 px-1 py-0.5 rounded text-sm font-mono text-gray-800">$1</code>');if(i=i.replace(/\[([^\]]+)\]\(([^)]+)\)/g,'<a href="$2" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:text-blue-800 underline">$1</a>'),i=i.replace(/\*\*(.*?)\*\*/g,'<strong class="font-semibold">$1</strong>'),i=i.replace(/\*(.*?)\*/g,'<em class="italic">$1</em>'),o.startsWith("> ")){s.push(e.jsx("blockquote",{className:"border-l-4 border-blue-300 pl-4 py-2 my-4 bg-blue-50 text-gray-700 italic",children:e.jsx("div",{dangerouslySetInnerHTML:{__html:i.substring(2)}})},t)),t++;continue}if(o.startsWith("# ")){const a=i.substring(2);s.push(e.jsx("h1",{className:"text-3xl font-bold mt-8 mb-4 text-black",children:e.jsx("div",{dangerouslySetInnerHTML:{__html:a}})},t))}else if(o.startsWith("## ")){const a=i.substring(3);s.push(e.jsx("h2",{className:"text-2xl font-semibold mt-6 mb-3 text-black",children:e.jsx("div",{dangerouslySetInnerHTML:{__html:a}})},t))}else if(o.startsWith("### ")){const a=i.substring(4);s.push(e.jsx("h3",{className:"text-xl font-medium mt-4 mb-2 text-black",children:e.jsx("div",{dangerouslySetInnerHTML:{__html:a}})},t))}else if(o.startsWith("#### ")){const a=i.substring(5);s.push(e.jsx("h4",{className:"text-lg font-medium mt-3 mb-2 text-black",children:e.jsx("div",{dangerouslySetInnerHTML:{__html:a}})},t))}else if(o.trim()==="")s.push(e.jsx("br",{},t));else if(o.includes("=")&&(o.includes("_")||o.includes("^")||o.includes("∑")||o.includes("∫")))s.push(e.jsx("div",{className:"bg-gray-50 p-3 my-2 rounded border-l-4 border-blue-200 font-mono text-sm",children:o},t));else if(o.trim().startsWith("- ")){const a=i.substring(i.indexOf("- ")+2);s.push(e.jsx("li",{className:"ml-4 mb-1 text-gray-700 list-disc",children:e.jsx("div",{dangerouslySetInnerHTML:{__html:a}})},t))}else if(/^\d+\./.test(o.trim())){const a=i.substring(i.indexOf(".")+1).trim();s.push(e.jsx("li",{className:"ml-4 mb-1 text-gray-700 list-decimal",children:e.jsx("div",{dangerouslySetInnerHTML:{__html:a}})},t))}else s.push(e.jsx("p",{className:"mb-3 text-gray-700 leading-relaxed",dangerouslySetInnerHTML:{__html:i}},t));t++}return s};return e.jsx("div",{className:"prose prose-lg max-w-none",children:h(g)})}function H({blogId:g,onBack:h}){const[c,r]=p.useState(!1),[s,t]=p.useState(!1),[l,o]=p.useState(!1);p.useEffect(()=>{const n=setTimeout(()=>r(!0),100);return()=>clearTimeout(n)},[]);const a=[{id:1,title:"Kornai (1979) Framework on Autocratic Governance",excerpt:"A comment on Kornai (1979) where I found similarities between socialist firms and autocratic local governments",date:"2024-02-05",readTime:"6 min read",tags:["Political Economy","Governance","Theory"],featured:!0,content:`## Introduction

After randomly came across Kornai's work on _"Resource-Constrained versus Demand-Constrained System" (1979)_, I realized it idea of soft/hard budget constraint displays a very neat framework to explain why autocratic government, especially the local government, often deviates from the demand of populace.

In Kornai's work, he suggests that firms in socialist systems are only subject to soft budget constraints, i.e. the loss from investment does not damage the financial ability of the firm as it is owned by the state. Whereas in capitalist system, firms are immediately constrained by demands from the market, avoiding overly occupying social resources. In all circumstances, however, firms prioritize the most immediate constraint as it decides the survival of the firm. Thus, socialist firms suffer from "investment hunger", which relentlessly push for expansion regardless of actual market demands or the efficient use of resources to maintain state support till the exhaustion of resources, creating shortages.

## A Political Perspective

The detachment of firms from the market could certainly be undesirable. The detachment of local government from its residents, however, could raise more issues. In fact, any autocratic state should suffer from this issue more or less.

As the nature of all autocratic system, local government officials are appointed by its superior, which means their responsibilities lies in achieving need of the superior. That need, however, does not necessary align with those from the residents. Put it into Karnai's framework, local government in autocratic state is delimited by the by its interaction with superior, while in democratic state, it is delimited by the interaction with local resident. This is an analogous of the resource/demand constraint faced by socialist/capitalist firms. Thus, just like socialist firms have no incentive to save resources, autocratic local governments have no incentive to benefit its residents.

This lack of incentive occurs even when the central government's ultimate goal is to benefit the populace, as any policy relies on local government's implementation. With its hard constraint bounded by the populace, local government has to achieve the policy in a way that is generally agreed by the resident, where autocratic local governments, who's hard constraint is bounded by the central government, the policy can executed in any form, as long as it achieves the target.

The aforementioned idea could be illustrated using my **mushroom-shaped flowchart**.

![Mushroom Flowchart](downloadable/blog/Mushroom.png)

As one could see from the chart, the local government has the ruling power towards the people, while its primary responsibility is not tied with the needs of people. Local government only has a secondary responsibility towards the populace, i.e. the people influence the central government, which governs the local government.

Such detachment between local government's responsibility and power has caused issues like the overly stringent lock-down policy during the COVID-19 era in China. The ultimate goal of the central government is to reduce the number of cases, which is certainly not wrong. However, since local government has no incentive to benefit its people, especially during such urgent event, it takes every measure at any cost to eliminate any possibility of COVID spreading, which, of course, includes killing dogs during break-in home COVID tests and leaving people that are suspect to be infected in Fangcang Hospital without any actual treatment. These measures obviously harms the welfare of general public and it does not matter as local government's primary responsibility, the one that decides the political career of local governor, is to fulfill the goal of the superior.

## Conclusion

It is sad to say this, but I think in any autocratic system, where the responsibility goes upward and power goes downward, faces the same problem. It shall be the intrinsic nature of autocratic systems, a steady state that any autocratic system converge to.`},{id:2,title:"Fedora Silverblue Setup Guide",excerpt:"Here are some steps I would take after installing Fedora Silverblue",date:"2023-12-25",readTime:"15 min read",tags:["Fedora","Linux","Guide"],content:`Feel free to contact me if you have any question with these instructions! Either through email or on the website's GitHub repository.

> Many of the contents here are borrowed from [Willi Mutschler](https://mutschler.dev/linux/fedora-post-install/#). However, since I work with Fedora Silverblue rather than Fedora Workstation, many of the installation steps would be different due to the immutable nature of Silverblue. For that reason, I think this post would still show it's value.

The version used is Fedora Silverblue 39 at the time this post is written. Most of the softwares are probably more personal and economists-oriented.

## Background Info for Silverblue

Silverblue differs from the normal Fedora Workstation as it is immutable, meaning the system files are read-only and updates are installed as a whole. Put it more technically, \`/\` and \`/usr\` and everything below it is read-only, while stuffs under \`/var\` are user-changeable. For more information, please consult [Fedora Docs](https://docs.fedoraproject.org/en-US/fedora-silverblue/technical-information/).

This means Silverblue needs to install applications and packages differently from Workstation, i.e. \`dnf install\` will not work, more specifically, there are 3 ways to do it.

### Flatpak

Flatpak is the predominant way to install applications, as it places each application into a sandbox, aligning with the immutable approach of the Silverblue.

It is generally recommended to add Flathub repo to gain access to more applications, for instructions to do that, please consult [Fedora Doc](https://docs.fedoraproject.org/en-US/fedora-silverblue/getting-started/).

### Toolbox

Toolbox creates an isolated container to install packages and softwares, it is almost like a emulator of the host system, or like a self-contained system that is attached to the host system.

To create a toolbox, you can use the command:

\`\`\`bash
create toolbox --container [name of container]
\`\`\`

After entering the toolbox

\`\`\`bash
toolbox eneter [name of container]
\`\`\`

It is possible to use the normal Fedora/RHEL command.

### Layering

Layering is against the immutable approach of the system, but, many packages benefits from layering as it is layer upon the system and has a more direct connection with the system. I would recommend only install very necessary packages using layering, like graphics card drivers etc.

To layer a package onto the system:

\`\`\`bash
rpm-ostree install [package name]
\`\`\`

To uninstall a layered package:

\`\`\`bash
rpm-ostree uninstall [package name]
\`\`\`

## Graphics

### Wayland & Xorg

Fedora uses Wayland as default and will depreciate Xorg gradually, but in practice the experience is quite awful if you have a Nvidia card with drivers not properly set up. However, lately advancement from Nvidia side has made Wayland quite usable, providing you installed all the drivers.

#### Use Xorg

By using Xorg session, I can solve most displaying issues with VSCode and Obsidian (Both installed through Flatpak). To use Xorg instead of Wayland, uncomment \`WaylandEnable=false\` and add \`DefaultSession=gnome-xorg.desktop\` to the [daemon] section of \`/etc/gdm/custom.conf\`

\`\`\`bash
sudo nano /etc/gdm/custom.conf
# [daemon]
# WaylandEnable=false
# DefaultSession=gnome-xorg.desktop

# Cuda libs for Xorg
rpm-ostree install xorg-x11-drv-nvidia-cuda
rpm-ostree install xorg-x11-drv-nvidia-cuda-libs
\`\`\`

And then reboot for the change to take effect.

#### Nvidia & Wayland

To install the proprietary Nvidia driver

\`\`\`bash
rpm-ostree update

# Nvidia proprieatary driver
rpm-ostree install akmod-nvidia

# The Nvidia proprieatary driver doesn't support VAAPI, but there is a wrapper that can bridge NVDEC/NVENC with VAAPI
rpm-ostree install nvidia-vaapi-driver

# Provides more codec for video streaming
rpm-ostree install libavcodec-freeworld
\`\`\`

After all the installations, follow the instruction and reboot the system

\`\`\`bash
systemctl reboot
\`\`\`

## Softwares

### Foliate

I really like this handy software to read my \`.epub\` books, but it has some problem accessing the graphics card or some sort, resulting in the page not being able to render properly. I think the problem mostly lies with the fact of lack of permission.

The simplest way to fix this issue is to disable GPU acceleration for Foliate, to do that.

1.  Install \`Flatseal\` either by GUI or command line
2.  Disable the **GPU acceleration** option for Foliate
3.  Problem fixed!

Since **Foliate** is not a very demanding software, even without GPU acceleration the whole thing runs smoothly enough for me to not search for other solutions.

### MATLAB

#### Installation

Always refer to the official installation guide for more info.

After the downloading the MATLAB installation file, unzip it with

\`\`\`bash
unzip matlab_R2023b_glnxa64.zip -d matlab_R2023b_glnxa64
\`\`\`

Navigate to \`matlab_R2023b_glnxa64\` directory and launch the installer with

\`\`\`bash
./install
\`\`\`

Install MATLAB under \`/var\` directory so you have full permission. I recommend installing it to: \`/var/home/$USER/bin\`

#### Desktop Entry

Here is a reference for what you need to put in for the desktop entry

\`\`\`bash
[Desktop Entry]
Version=1.0
Type=Application
Terminal=false
Exec=/var/home/$USER/bin/MATLAB/R2023b/bin/matlab -desktop
Name=MATLAB R2023b
Icon=/var/home/$USER/bin/MATLAB/bin/glnxa64/cef_resources/matlab_icon.png
Categories=Development;Math;Science
Comment=Scientific computing environment
StartupNotify=true
StartupWMClass=sun-awt-X11-XFramePeer
MimeType=text/x-matlab
\`\`\`

#### Libraries

Although [Willi Mutschler](https://mutschler.dev/linux/fedora-post-install/#) suggests that it is better to use system libraries instead of MATLAB's shipped libraries, as it solves most issues with MATLAB. During my experiment, this is not the case as with Silverblue, MATLAB does not have the access to system level files and is unable to utilize the system libraries. Thus, there is no need to exclude the shipped packages with MATLAB, in fact, you need to copy some packages from system to MATLAB directories for Dynare to work properly, as it cannot access system level file either.

### Dynare

Dynare needs to be compiled from source on a Fedora-based system, and the method to do it is slightly different in Silverblue.

#### Fundamental packages

In order to compile Dynare, we need to install several packages, I would recommend install these packages in a toolbox to align with the immutable approach.

\`\`\`bash
toolbox create --container Dynare-compile
# Enter the toolbox
toolbox enter Dynare-compile
\`\`\`

Install all the packages inside this toolbox

\`\`\`bash
# Minimal packages (use --disable-doc and --disable-octave flags)
sudo dnf install -y gcc gcc-g++ gfortran boost-devel gsl-devel lapack lapack-devel matio-devel openblas openblas-devel suitesparse-devel bison flex make autoconf automake redhat-rpm-config
# Octave packages (use --disable-doc flag)
sudo dnf install -y octave octave-devel octave-statistics octave-io octave-optim octave-control
# Documentation packages
sudo dnf install -y texlive-scheme-minimal texlive-collection-publishers texlive-collection-latexextra texlive-collection-fontsextra texlive-collection-latexrecommended texlive-collection-science texlive-collection-plaingeneric texlive-lm python3-sphinx latexmk mathjax doxygen
\`\`\`

Next, compile \`solicot\` and \`x13as\`, although I am not very sure the use of \`x13as\` as it is not directly involved in the compiling. The code below are from [Dynare compiling instruction for Fedora, CentOS or RHEL on GitLab](https://git.dynare.org/Dynare/dynare#fedora-centos-or-rhel).

\`\`\`bash
# compile slicot from source and put it into /home/$USER/dynare/slicot/lib/
mkdir -p /var/home/$USER/dynare/slicot
cd /var/home/$USER/dynare/slicot
wget https://deb.debian.org/debian/pool/main/s/slicot/slicot_5.0+20101122.orig.tar.gz
tar xf slicot_5.0+20101122.orig.tar.gz
cd slicot-5.0+20101122
make FORTRAN=gfortran OPTS="-O2 -fPIC -fdefault-integer-8" LOADER=gfortran lib
mkdir -p /var/home/$USER/dynare/slicot/lib
cp slicot.a /var/home/$USER/dynare/slicot/lib/libslicot64_pic.a #for MATLAB
cp slicot.a /var/home/$USER/dynare/slicot/lib/libslicot_pic.a #for octave

# compile x13as from source and put it into /usr/bin/
mkdir -p /var/home/$USER/dynare/x13as
cd /var/home/$USER/dynare/x13as
wget https://www2.census.gov/software/x-13arima-seats/x13as/unix-linux/program-archives/x13as_asciisrc-v1-1-b60.tar.gz
tar xf x13as_asciisrc-v1-1-b60.tar.gz
sed -i "s|-static| |" makefile.gf # this removes '-static' in the makefile.gf
make -f makefile.gf FFLAGS="-O2 -std=legacy" PROGRAM=x13as
sudo cp x13as /usr/bin/
\`\`\`

#### Compile Dynare

Once the perquisite packages are sorted, we can start to compile Dynare.

\`\`\`bash
cd /var/home/$USER/dynare
# This uses the current unstable branch
git clone --recurse-submodules https://git.dynare.org/dynare/dynare.git unstable
cd unstable
# Direct Dynare to your MATLAB path
meson setup -Dmatlab_path=/var/home/$USER/bin/MATLAB -Dfortran_args="[ '-B', '/var/home/$USER/dynare/slicot/lib']" -Dbuildtype=debugoptimized build-matlab
meson compile -C build-matlab
ninja -C build-matlab
meson install -C build-matlab
\`\`\`

These steps shall give you a nearly workable Dynare, expect now it needs the latest \`libstdc++.so.6\` and \`libstdc++.so.6.0.32\` packages shipped with the system. As I mentioned before, Silverblue makes MATLAB lack the access to use the system shipped packages, rather, we have to rely on those shipped with MATLAB.

To do this, we first move the \`libstdc++.so.6\` and \`libstdc++.so.6.0.32\` packages came with MATLAB to an exclude folder and the copy-paste the one from our system into MATLAB.

\`\`\`bash
export MATLAB_ROOT=/var/home/$USER/bin/MATLAB
cd /var/home/$USER/bin/MATLAB/sys/os/glnxa64
mkdir -p exclude
mv libstdc++* exclude/
cd /lib64
cp libstdc++.so.6 /var/home/$USER/bin/MATLAB/sys/os/glnxa64
cp libstdc++.so.6.0.32 /var/home/$USER/bin/MATLAB/sys/os/glnxa64
\`\`\`

This should give you a running Dynare, simply add Dynare into the directory in MATLAB after.

### LaTeX

I use LaTeX with VSCode for all my writings, but to use this combo is a bit harder in Silverblue. My approach is to install LaTeX in a toolbox and then let VSCode (and LaTeX Workshop) communicate with LaTeX stored inside the toolbox.

#### Install TeX Live

\`\`\`bash
# Create the LaTeX container
toolbox create --container LaTeX
toolbox enter LaTeX

# Add the Tex Live repository if needed
sudo dnf config-manager --add-repo https://mirrors.tuna.tsinghua.edu.cn/texlive/fedora/

# Instal the package
sudo dnf install texlive texlive-scheme-full texlive-extra-utils

# Update the packages
sudo dnf update texlive*

# Verify the installation
tex --version
\`\`\`

#### VSCode and LaTeX Workshop extension

Simply use the flatpak to install VSCode, the community maintained version works fine for me, or you could work a way to install the official one by layering or through toolbox.

After installing VSCode, use the extension shop to install LaTeX Workshop extension.

Once LaTeX Workshop is install, we need to configure it so that it can communicate with LaTeX in the toolbox, for that, we need to edit the \`settings.json\` of VSCode

Change the corresponding entries in the \`settings.json\` to be

\`\`\`json
// Only if you use LaTeX Utilities extension for word count etc.
"latex-utilities.countWord.path": "host-spawn",
"latex-utilities.countWord.args": ["toolbox", "run", "--container", "LaTeX", "texcount"],

// Required for LaTeX Workshop
"latex-workshop.latex.tools": [
        {
            "name": "latexmk",
            "command": "host-spawn",
            "args": [
                "toolbox",
                "run",
                "--container",
                "LaTeX",
                "latexmk",
                "-synctex=1",
                "-interaction=nonstopmode",
                "-file-line-error",
                "-pdf",
                "-outdir=%OUTDIR%",
                "%DOC%"
            ],
            "env": {}
        },
        {
            "name": "lualatexmk",
            "command": "host-spawn",
            "args": [
                "toolbox",
                "run",
                "--container",
                "LaTeX",
                "latexmk",
                "-synctex=1",
                "-interaction=nonstopmode",
                "-file-line-error",
                "-lualatex",
                "-outdir=%OUTDIR%",
                "%DOC%"
            ],
            "env": {}
        },
        {
            "name": "xelatexmk",
            "command": "host-spawn",
            "args": [
                "toolbox",
                "run",
                "--container",
                "LaTeX",
                "latexmk",
                "-synctex=1",
                "-interaction=nonstopmode",
                "-file-line-error",
                "-xelatex",
                "-outdir=%OUTDIR%",
                "%DOC%"
            ],
            "env": {}
        },
        {
            "name": "latexmk_rconly",
            "command": "latexmk",
            "args": [
                "%DOC%"
            ],
            "env": {}
        },
        {
            "name": "pdflatex",
            "command": "host-spawn",
            "args": [
                "toolbox",
                "run",
                "--container",
                "LaTeX",
                "pdflatex",
                "-synctex=1",
                "-interaction=nonstopmode",
                "-file-line-error",
                "%DOC%"
            ],
        },
        {
            "name": "bibtex",
            "command": "host-spawn",
            "args": [
                "toolbox",
                "run",
                "--container",
                "LaTeX",
                "bibtex",
                "%DOCFILE%"
            ],
            "env": {}
        },
        {
            "name": "rnw2tex",
            "command": "host-spawn",
            "args": [
                "toolbox",
                "run",
                "--container",
                "LaTeX",
                "Rscript",
                "-e",
                "knitr::opts_knit$set(concordance = TRUE); knitr::knit('%DOCFILE_EXT%')"
            ],
            "env": {}
        },
        {
            "name": "jnw2tex",
            "command": "host-spawn",
            "args": [
                "toolbox",
                "run",
                "--container",
                "LaTeX",
                "julia",
                "-e",
                "using Weave; weave("%DOC_EXT%", doctype="tex")"
            ],
            "env": {}
        },
        {
            "name": "jnw2texminted",
            "command": "host-spawn",
            "args": [
                "toolbox",
                "run",
                "--container",
                "LaTeX",
                "julia",
                "-e",
                "using Weave; weave("%DOC_EXT%", doctype="texminted")"
            ],
            "env": {}
        },
        {
            "name": "pnw2tex",
            "command": "host-spawn",
            "args": [
                "toolbox",
                "run",
                "--container",
                "LaTeX",
                "pweave",
                "-f",
                "tex",
                "%DOC_EXT%"
            ],
            "env": {}
        },
        {
            "name": "pnw2texminted",
            "command": "host-spawn",
            "args": [
                "toolbox",
                "run",
                "--container",
                "LaTeX",
                "pweave",
                "-f",
                "texminted",
                "%DOC_EXT%"
            ],
            "env": {}
        },
        {
            "name": "tectonic",
            "command": "host-spawn",
            "args": [
                "toolbox",
                "run",
                "--container",
                "LaTeX",
                "tectonic",
                "--synctex",
                "--keep-logs",
                "%DOC%.tex"
            ],
            "env": {}
        }
    ],
    "latex-workshop.linting.chktex.enabled": true,
    "latex-workshop.linting.chktex.exec.path": "host-spawn",
    "latex-workshop.linting.chktex.exec.args": [
        "toolbox",
        "run",
        "--container",
        "LaTeX",
        "chktex",
        "-wall",
        "-n22",
        "-n30",
        "-e16",
        "-q"
    ],
\`\`\`

This would allow LaTeX Workshop to communicate with LaTeX.`}].find(n=>n.id===g);return a?e.jsx("div",{className:"min-h-screen pb-12",children:e.jsxs("div",{className:"max-w-7xl mx-auto px-6",children:[e.jsxs(y.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.6},className:"py-8",children:[e.jsxs(m,{variant:"ghost",onClick:h,className:"mb-8 text-black hover:bg-gray-100",children:[e.jsx(v,{className:"w-4 h-4 mr-2"}),"Back to Blog"]}),e.jsxs("header",{className:"mb-8 page-header",children:[e.jsx("h1",{className:"text-black mb-6",style:{fontSize:"var(--academic-font-size-page-title)",fontWeight:"var(--academic-font-weight-page-title)",lineHeight:"var(--academic-line-height-tight)"},children:a.title}),e.jsxs("div",{className:"flex flex-wrap items-center gap-6 mb-6",children:[e.jsxs("div",{className:"flex items-center gap-2 text-gray-600",children:[e.jsx(T,{className:"w-4 h-4"}),e.jsx("span",{style:{fontSize:"var(--academic-font-size-metadata)"},children:new Date(a.date).toLocaleDateString("en-US",{year:"numeric",month:"long",day:"numeric"})})]}),e.jsxs("div",{className:"flex items-center gap-2 text-gray-600",children:[e.jsx(L,{className:"w-4 h-4"}),e.jsx("span",{style:{fontSize:"var(--academic-font-size-metadata)"},children:a.readTime})]})]}),e.jsx("div",{className:"flex flex-wrap gap-2 mb-8",children:a.tags.map(n=>e.jsx(w,{variant:"secondary",className:"bg-gray-100 text-gray-700 hover:bg-gray-200",children:n},n))})]})]}),e.jsxs("div",{className:"flex gap-8",children:[e.jsxs("div",{className:"flex-1",children:[e.jsx(y.article,{initial:{opacity:0,y:20},animate:{opacity:c?1:0,y:c?0:20},transition:{duration:.6,delay:.2},className:"prose prose-lg max-w-none",style:{fontSize:"var(--academic-font-size-body)",lineHeight:"var(--academic-line-height-normal)",color:"var(--academic-text-primary)"},children:e.jsx(N,{content:a.content})}),e.jsx(y.div,{initial:{opacity:0,y:20},animate:{opacity:c?1:0,y:c?0:20},transition:{duration:.6,delay:.4},className:"mt-12 pt-8 border-t border-gray-200",children:e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsxs("div",{className:"flex items-center gap-4",children:[e.jsxs(m,{variant:"outline",size:"sm",onClick:()=>t(!s),className:`${s?"bg-blue-50 text-blue-600 border-blue-200":""}`,children:[e.jsx(j,{className:`w-4 h-4 mr-2 ${s?"fill-current":""}`}),s?"Liked":"Like"]}),e.jsxs(m,{variant:"outline",size:"sm",onClick:()=>o(!l),className:`${l?"bg-yellow-50 text-yellow-600 border-yellow-200":""}`,children:[e.jsx(S,{className:`w-4 h-4 mr-2 ${l?"fill-current":""}`}),l?"Saved":"Save"]})]}),e.jsxs(m,{variant:"outline",size:"sm",children:[e.jsx(A,{className:"w-4 h-4 mr-2"}),"Share"]})]})})]}),e.jsx("div",{className:"hidden lg:block w-64 flex-shrink-0",children:e.jsx(k,{})})]})]})}):e.jsx("div",{className:"min-h-screen flex items-center justify-center",children:e.jsxs("div",{className:"text-center",children:[e.jsx("h1",{className:"text-2xl font-bold mb-4",children:"Post not found"}),e.jsxs(m,{onClick:h,children:[e.jsx(v,{className:"w-4 h-4 mr-2"}),"Back to Blog"]})]})})}export{H as BlogPostPage};
