\NeedsTeXFormat{LaTeX2e}
\ProvidesClass{scholarflow-report}[2026/11/15 Chinese technical report]
\RequirePackage{iftex}
\RequireXeTeX
\LoadClass[UTF8,12pt,a4paper,fontset=none]{ctexart}

\RequirePackage[a4paper,left=24mm,right=24mm,top=25mm,bottom=23mm,
  headheight=17pt,headsep=9mm]{geometry}
\RequirePackage{fontspec,graphicx,xcolor,fancyhdr,needspace}
\RequirePackage{caption,tcolorbox,tikz,longtable,array,colortbl}
\tcbuselibrary{breakable}
\usetikzlibrary{arrows.meta}
\RequirePackage[unicode]{hyperref}

% 把字体文件放在项目目录，或将字体安装为系统字体。
\IfFileExists{SourceHanSerifSC-Regular.otf}{
  \setCJKmainfont[Path=./,FakeBold=.70,BoldFont=SourceHanSerifSC-Regular.otf,
    BoldFeatures={FakeBold=2.1}]{SourceHanSerifSC-Regular.otf}
}{
  \IfFontExistsTF{Source Han Serif SC}{
    \setCJKmainfont[FakeBold=.70,BoldFont={Source Han Serif SC},
      BoldFeatures={FakeBold=2.1}]{Source Han Serif SC}
  }{
    \IfFileExists{\string~/AppData/Local/Microsoft/Windows/Fonts/SourceHanSerifSC-Regular.otf}{
      \setCJKmainfont[Path={\string~/AppData/Local/Microsoft/Windows/Fonts/},
        FakeBold=.70,BoldFont=SourceHanSerifSC-Regular.otf,
        BoldFeatures={FakeBold=2.1}]{SourceHanSerifSC-Regular.otf}
    }{
      \ClassWarningNoLine{scholarflow-report}{Source Han Serif SC not found.
        Using FandolSong. Install Source Han Serif SC or add its OTF beside the main file}
      \setCJKmainfont[BoldFont=FandolSong-Bold.otf]{FandolSong-Regular.otf}
    }
  }
}
\IfFontExistsTF{Cambria}{\setmainfont{Cambria}}{\setmainfont{TeX Gyre Pagella}}
\IfFontExistsTF{Calibri}{\setsansfont{Calibri}}{\setsansfont{TeX Gyre Heros}}

\definecolor{reportink}{HTML}{000000}
\definecolor{reportblue}{HTML}{194869}
\definecolor{reportteal}{HTML}{25645B}
\definecolor{reportgold}{HTML}{976023}
\definecolor{reportmint}{HTML}{EBF4F0}
\definecolor{reportcream}{HTML}{FAF1E2}
\definecolor{tableblue}{HTML}{E7EFF5}
\definecolor{tableline}{HTML}{D9E0E5}
\definecolor{faint}{HTML}{F5F8FA}
\definecolor{sectionrule}{HTML}{AFC4D3}
\definecolor{figurecaption}{HTML}{425A6A}
\definecolor{linkblue}{HTML}{195777}
\hypersetup{colorlinks=true,linkcolor=linkblue,urlcolor=linkblue,citecolor=linkblue}

\newcommand{\ReportProject}{}
\newcommand{\ReportTitle}{技术报告}
\newcommand{\ReportCoverTitle}{\ReportTitle}
\newcommand{\ReportSubtitle}{}
\ExplSyntaxOn
\keys_define:nn { sf/report }
  {
    project     .code:n = \renewcommand{\ReportProject}{#1},
    title       .code:n = \renewcommand{\ReportTitle}{#1},
    cover-title .code:n = \renewcommand{\ReportCoverTitle}{#1},
    subtitle    .code:n = \renewcommand{\ReportSubtitle}{#1}
  }
\NewDocumentCommand{\ReportSetup}{m}{\keys_set:nn { sf/report } { #1 }}
\ExplSyntaxOff

\setlength{\parindent}{0pt}
\setlength{\parskip}{7pt}
\setlength{\LTleft}{0pt}
\setlength{\LTright}{0pt}
\renewcommand{\arraystretch}{1.28}
\linespread{1.28}
\emergencystretch=2em
\widowpenalty=10000
\clubpenalty=10000
\AtBeginDocument{\color{reportink}\hypersetup{pdftitle={\ReportTitle}}}

\pagestyle{fancy}
\fancyhf{}
\fancyhead[L]{\small\bfseries\textcolor{reportblue}{\ReportProject}}
\fancyhead[R]{\small\textcolor{reportblue}{\ReportTitle}}
\fancyfoot[R]{\small\thepage}
\renewcommand{\headrulewidth}{.35pt}

\NewDocumentCommand{\MakeReportCover}{}{
  \begin{titlepage}
  \thispagestyle{empty}
  \vspace*{9mm}
  {\sffamily\fontsize{17}{22}\selectfont\ReportProject\par}
  \vspace{37mm}
  \begin{tcolorbox}[colback=faint,colframe=reportblue,boxrule=0pt,
    leftrule=2.1pt,arc=0pt,left=7mm,right=6mm,top=9mm,bottom=9mm]
  {\color{reportteal}\rule{19mm}{2pt}\par}
  \vspace{5mm}
  {\bfseries\fontsize{34}{45}\selectfont\ReportCoverTitle\par}
  \vspace{7mm}
  {\fontsize{16}{22}\selectfont\ReportSubtitle\par}
  \end{tcolorbox}
  \end{titlepage}
  \setcounter{page}{1}
}

\ctexset{
  section={format=\bfseries\fontsize{19}{25}\selectfont\color{reportblue},
    name={,},number=\arabic{section},aftername={.\enspace},
    beforeskip=8pt,afterskip=9pt},
  subsection={format=\bfseries\fontsize{14}{20}\selectfont\color{reportink},
    name={,},number=\thesection.\arabic{subsection},aftername=\enspace,
    beforeskip=17pt,afterskip=7pt}
}
\NewDocumentCommand{\ReportSection}{s m}{
  \par\Needspace{5\baselineskip}\addvspace{21pt}
  \noindent\makebox[\linewidth][l]{%
    \textcolor{reportteal}{\rule{19mm}{1.35pt}}\hspace{1.3mm}%
    \textcolor{sectionrule}{\rule{\dimexpr\linewidth-20.3mm\relax}{.45pt}}}\par
  \nobreak
  \IfBooleanTF{#1}{\section*{#2}}{\section{#2}}
}

% 说明框可以分页，正文文字保持黑色。
\tcbset{reportPanel/.style={breakable,boxrule=0pt,leftrule=1.65pt,arc=0pt,
  left=3mm,right=3mm,top=1.1mm,bottom=1.1mm,before skip=7pt,after skip=8pt,
  fontupper=\small\color{reportink}}}
\newtcolorbox{ReportContext}{reportPanel,colback=tableblue!60,colframe=reportblue}
\newtcolorbox{ReportIncident}{reportPanel,colback=reportcream,colframe=reportgold}
\newtcolorbox{ReportDecision}{reportPanel,colback=reportmint,colframe=reportteal}

\DeclareCaptionFont{reportcap}{\color{figurecaption}}
\DeclareCaptionFont{reportlabel}{\color{reportteal}\bfseries}
\captionsetup[figure]{name=图,labelsep=quad,font={small,reportcap},
  labelfont=reportlabel,skip=6pt,justification=centering}
\NewDocumentEnvironment{ReportFigure}{}
  {\par\addvspace{8pt}\noindent\begin{minipage}{\linewidth}\centering
   \captionsetup{type=figure}}
  {\par\end{minipage}\par\addvspace{8pt}}
\NewDocumentCommand{\ReportFigureNote}{m}{%
  \par\medskip{\footnotesize\color{reportink}#1\par}}
\endinput
