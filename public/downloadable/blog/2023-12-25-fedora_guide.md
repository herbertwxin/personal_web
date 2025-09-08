---
layout: post
title: "Fedora Silverblue Setup Guide"
description: Here are some steps I would take after installing Fedora Silverblue
pubDate: 2023-12-25
tags: Fedora, Linux
categories: Guide
---

Feel free to contact me if you have any question with these instructions! Either through email or on the website's GitHub repository.

> Many of the contents here are borrowed from [Willi Mutschler](https://mutschler.dev/linux/fedora-post-install/#). However, since I work with Fedora Silverblue rather than Fedora Workstation, many of the installation steps would be different due to the immutable nature of Silverblue. For that reason, I think this post would still show it's value.

The version used is Fedora Silverblue 39 at the time this post is written. Most of the softwares are probably more personal and economists-oriented.

## Background Info for Silverblue

Silverblue differs from the normal Fedora Workstation as it is immutable, meaning the system files are read-only and updates are installed as a whole. Put it more technically, `/` and `/usr` and everything below it is read-only, while stuffs under `/var` are user-changeable. For more information, please consult [Fedora Docs](https://docs.fedoraproject.org/en-US/fedora-silverblue/technical-information/).

This means Silverblue needs to install applications and packages differently from Workstation, i.e. `dnf install` will not work, more specifically, there are 3 ways to do it.

### Flatpak

Flatpak is the predominant way to install applications, as it places each application into a sandbox, aligning with the immutable approach of the Silverblue.

It is generally recommended to add Flathub repo to gain access to more applications, for instructions to do that, please consult [Fedora Doc](https://docs.fedoraproject.org/en-US/fedora-silverblue/getting-started/).

### Toolbox

Toolbox creates an isolated container to install packages and softwares, it is almost like a emulator of the host system, or like a self-contained system that is attached to the host system.

To create a toolbox, you can use the command:

```bash
create toolbox --container [name of container]
```

After entering the toolbox

```bash
toolbox eneter [name of container]
```

It is possible to use the normal Fedora/RHEL command.

### Layering

Layering is against the immutable approach of the system, but, many packages benefits from layering as it is layer upon the system and has a more direct connection with the system. I would recommend only install very necessary packages using layering, like graphics card drivers etc.

To layer a package onto the system:

```bash
rpm-ostree install [package name]
```

To uninstall a layered package:

```bash
rpm-ostree uninstall [package name]
```

## Graphics

### Wayland & Xorg

Fedora uses Wayland as default and will depreciate Xorg gradually, but in practice the experience is quite awful if you have a Nvidia card with drivers not properly set up. However, lately advancement from Nvidia side has made Wayland quite usable, providing you installed all the drivers.

#### Use Xorg

By using Xorg session, I can solve most displaying issues with VSCode and Obsidian (Both installed through Flatpak). To use Xorg instead of Wayland, uncomment `WaylandEnable=false` and add `DefaultSession=gnome-xorg.desktop` to the [daemon] section of `/etc/gdm/custom.conf`

```bash
sudo nano /etc/gdm/custom.conf
# [daemon]
# WaylandEnable=false
# DefaultSession=gnome-xorg.desktop

# Cuda libs for Xorg
rpm-ostree install xorg-x11-drv-nvidia-cuda
rpm-ostree install xorg-x11-drv-nvidia-cuda-libs
```

And then reboot for the change to take effect.

#### Nvidia & Wayland

To install the proprietary Nvidia driver

```bash
rpm-ostree update

# Nvidia proprieatary driver
rpm-ostree install akmod-nvidia

# The Nvidia proprieatary driver doesn't support VAAPI, but there is a wrapper that can bridge NVDEC/NVENC with VAAPI
rpm-ostree install nvidia-vaapi-driver

# Provides more codec for video streaming
rpm-ostree install libavcodec-freeworld
```

After all the installations, follow the instruction and reboot the system

```bash
systemctl reboot
```

## Softwares

### Foliate

I really like this handy software to read my `.epub` books, but it has some problem accessing the graphics card or some sort, resulting in the page not being able to render properly. I think the problem mostly lies with the fact of lack of permission.

The simplest way to fix this issue is to disable GPU acceleration for Foliate, to do that.

1.  Install `Flatseal` either by GUI or command line
2.  Disable the **GPU acceleration** option for Foliate
3.  Problem fixed!

Since **Foliate** is not a very demanding software, even without GPU acceleration the whole thing runs smoothly enough for me to not search for other solutions.

### MATLAB

#### Installation

Always refer to the official installation guide for more info.

1. After the downloading the MATLAB installation file, unzip it with

   ```bash
   	unzip matlab_R2023b_glnxa64.zip -d matlab_R2023b_glnxa64
   ```

2. Navigate to `matlab_R2023b_glnxa64` directory and launch the installer with

   ```bash
   ./install
   ```

3. Install MATLAB under `/var` directory so you have full permission, the way I do it is

   ```bash
   /var/home/$USER/bin
   ```

#### Desktop Entry

Here is a reference for what you need to put in for the desktop entry

```bash
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
```

#### Libraries

Although [Willi Mutschler](https://mutschler.dev/linux/fedora-post-install/#) suggests that it is better to use system libraries instead of MATLAB's shipped libraries, as it solves most issues with MATLAB. During my experiment, this is not the case as with Silverblue, MATLAB does not have the access to system level files and is unable to utilize the system libraries. Thus, there is no need to exclude the shipped packages with MATLAB, in fact, you need to copy some packages from system to MATLAB directories for Dynare to work properly, as it cannot access system level file either.

### Dynare

Dynare needs to be compiled from source on a Fedora-based system, and the method to do it is slightly different in Silverblue.

#### Fundamental packages

In order to compile Dynare, we need to install several packages, I would recommend install these packages in a toolbox to align with the immutable approach.

```bash
toolbox create --container Dynare-compile
# Enter the toolbox
toolbox enter Dynare-compile
```

Install all the packages inside this toolbox

```bash
# Minimal packages (use --disable-doc and --disable-octave flags)
sudo dnf install -y gcc gcc-g++ gfortran boost-devel gsl-devel lapack lapack-devel matio-devel openblas openblas-devel suitesparse-devel bison flex make autoconf automake redhat-rpm-config
# Octave packages (use --disable-doc flag)
sudo dnf install -y octave octave-devel octave-statistics octave-io octave-optim octave-control
# Documentation packages
sudo dnf install -y texlive-scheme-minimal texlive-collection-publishers texlive-collection-latexextra texlive-collection-fontsextra texlive-collection-latexrecommended texlive-collection-science texlive-collection-plaingeneric texlive-lm python3-sphinx latexmk mathjax doxygen
```

Next, compile `solicot` and `x13as`, although I am not very sure the use of `x13as` as it is not directly involved in the compiling. The code below are from [Dynare compiling instruction for Fedora, CentOS or RHEL on GitLab](https://git.dynare.org/Dynare/dynare#fedora-centos-or-rhel).

```bash
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
```

#### Compile Dynare

Once the perquisite packages are sorted, we can start to compile Dynare.

```bash
cd /var/home/$USER/dynare
# This uses the current unstable branch
git clone --recurse-submodules https://git.dynare.org/dynare/dynare.git unstable
cd unstable
# Direct Dynare to your MATLAB path
meson setup -Dmatlab_path=/var/home/$USER/bin/MATLAB -Dfortran_args="[ '-B', '/var/home/$USER/dynare/slicot/lib']" -Dbuildtype=debugoptimized build-matlab
meson compile -C build-matlab
ninja -C build-matlab
meson install -C build-matlab
```

These steps shall give you a nearly workable Dynare, expect now it needs the latest `libstdc++.so.6` and `libstdc++.so.6.0.32` packages shipped with the system. As I mentioned before, Silverblue makes MATLAB lack the access to use the system shipped packages, rather, we have to rely on those shipped with MATLAB.

To do this, we first move the `libstdc++.so.6` and `libstdc++.so.6.0.32` packages came with MATLAB to an exclude folder and the copy-paste the one from our system into MATLAB.

```bash
export MATLAB_ROOT=/var/home/$USER/bin/MATLAB
cd /var/home/$USER/bin/MATLAB/sys/os/glnxa64
mkdir -p exclude
mv libstdc++* exclude/
cd /lib64
cp libstdc++.so.6 /var/home/$USER/bin/MATLAB/sys/os/glnxa64
cp libstdc++.so.6.0.32 /var/home/$USER/bin/MATLAB/sys/os/glnxa64
```

This should give you a running Dynare, simply add Dynare into the directory in MATLAB after.

### LaTeX

I use LaTeX with VSCode for all my writings, but to use this combo is a bit harder in Silverblue. My approach is to install LaTeX in a toolbox and then let VSCode (and LaTeX Workshop) communicate with LaTeX stored inside the toolbox.

#### Install TeX Live

```bash
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
```

#### VSCode and LaTeX Workshop extension

Simply use the flatpak to install VSCode, the community maintained version works fine for me, or you could work a way to install the official one by layering or through toolbox.

After installing VSCode, use the extension shop to install LaTeX Workshop extension.

Once LaTeX Workshop is install, we need to configure it so that it can communicate with LaTeX in the toolbox, for that, we need to edit the `settings.json` of VSCode

Change the corresponding entries in the `settings.json` to be

```json
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
                "using Weave; weave(\"%DOC_EXT%\", doctype=\"tex\")"
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
                "using Weave; weave(\"%DOC_EXT%\", doctype=\"texminted\")"
            ],
            "env": {}
        },
        {
            "name": "pnw2tex",
            "command": "host-spaFeel free to contact me if you have any question with these instructions!wn",
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
```

This would allow LaTeX Workshop to communicate with LaTeX.
