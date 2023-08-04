# LaTeX of the APCA-W3 Base Formula
The following is a trial of GitHub's new LaTeX and MathJax support. As you can see there are some bugs at the moment (browser dependent??) and there are some missing features or commands.

----

```math
\begin{align} \\
\mathbf{APCA}\ & \mathbf{\bullet \ W3}\ \ \mathbf{\scriptstyle version\ { 0.1.9}\ { developed\ for\ WCAG\  3\ contrast\ guidelines}} \\
{\scriptstyle Using:}\ & \ \mathit{\scriptstyle APCA\ Contrast\ Prediction\ Equation\ \ 0.0.98G-4g-base-W3} \\\\[3ex]
&Perceptual\ Lightness\ Contrast = L^c \\\\[2ex]
\textstyle Where:& \\\\[1ex]

{\scriptstyle Clamp\ Minimu} & {\scriptstyle m\ Contrast\ to\ \mathit1\mathit0 \\\% \ then\ Offset\ \&amp; \ Final\ Scale} \\\\[0.5ex]
L^c = & \begin{cases}
  \ 0.0 \  \  \                                      & if\ \big\vert S_{apc} \big\vert < W_{clamp}\\\\[0.5ex]
  \big(\ S_{apc} - W_{offset}\ \big) \times 100.0\ \ & if\ \ S_{apc}\ > 0 \\\\[0.5ex]
  \big(\ S_{apc} + W_{offset}\ \big) \times 100.0\ \ & if\ \ S_{apc}\ < 0
\end{cases} \\\\[1.5ex]

{\scriptstyle Determine\ Pol} & {\scriptstyle arity,\ Find\ Lightness\ Difference,\ \&amp; \ Scale} \\\\[0.5ex]
S_{apc} = & \begin{cases}
\big(\ Y_{bg}^{Nbg} - Y_{txt}^{Ntx}\ \big) \times W_{scale} \ \ & if\ \ Y_{bg} > Y_{txt}\ \Big(\ ^{\ \ Normal\ Polarity}_{(dark\ text/light\ bg)} \Big) \\\\[0.5ex]
\big(\ Y_{bg}^{Rbg} - Y_{txt}^{Rtx}\ \big) \times W_{scale} \ \ & if\ \ Y_{bg} < Y_{txt}\ \Big(\ ^{\  Reverse\ Polarity}_{(light\ text/dark\ bg)} \Big)
\end{cases}  \\\\[2.25ex]

{\scriptstyle Soft\ Clip\ \&amp; \ C} & {\scriptstyle lamp\ Black\ Levels} \\\\[0.5ex]
Y_{txt} & = \ f_{sc}(Ys) \quad_{of\ the\ text,\ symbol,\ or\ object.}^{Where\ Ys\ is\ derived\ from\ the\ color} \\\\[1ex]
Y_{bg} & = \ f_{sc}(Ys) \quad_{used\ for\ the\ adjacent\ background.}^{Where\ Ys\ is\ derived\ from\ the\ color} \\\\[1ex]
Y_{fld} & = \ \mathrm{\scriptstyle Unused\ in\ W3\ version} \\\\[1.5ex]
f_{sc} & (Y_c) = \begin{cases}
  0.0   \ \quad                                \ & if\ \ Y_c  <  0.0 \\\\[0.5ex]
  Y_c + \big( B_{thrsh} - Y_c \big)^{B_{clip}} \ & if\ \ Y_c  <  B_{thrsh} \\\\[0.5ex]
  Y_c   \ \quad                                \ & Otherwise
\end{cases}  \\\\[1.5ex]

{\scriptstyle Estimate\ Scr} & {\scriptstyle een\ Luminance\ Using\ sRGB\ Coefficients} \\\\[0.5ex]
Ys & = \displaystyle\sum \begin{cases} 
{\color{#f8a}\ (\mathbf R^\prime \div 255.0)^{S_{trc}} \times 0.2126729} \\
{\color{#6f6} (\mathbf G^\prime \div 255.0)^{S_{trc}} \times 0.7151522} \\
{\color{#8bf} (\mathbf B^\prime \div 255.0)^{S_{trc}} \times 0.0721750} \\ 
\end{cases}  \\\\[1ex]
\hline 
Constant&s\ for\  \mathit0\mathit.\mathit0\mathit.\mathit9\mathit8G-\mathit4g-sRGB: \\
&\begin{alignedat}{3}
{\scriptstyle Powercur} & {\scriptstyle ve\ Exponents} \quad \quad & \quad {\scriptstyle Clamp} & {\scriptstyle s\ \&amp; \ Scalers} \\
S_{trc} & = 2.4 \quad & \quad  B_{clip} & = \  1.414 \\
   Ntx & = 0.57 \quad & \quad  B_{thrsh} & = \  0.022 \\
   Nbg & = 0.56 \quad & \quad  W_{scale} & = \  1.14 \\
   Rtx & = 0.62 \quad & \quad  W_{offset} & = \  0.027 \\
   Rbg & = 0.65 \quad & \quad  W_{clamp} & = \  0.1  \\
\end{alignedat}  \\\\[0.5ex]
\hline 
INPU&T:\ \ {\color{#f8a}R^\prime}, {G^\prime}, {\color{#8bf}B^\prime}\ \mathbf{\in\ sRGB} \ \ (Range: 0.0-255.0) \\\\[0.5ex]
\hline 
\mathit{\scriptscriptstyle Copyright\ ©\ 2019-2022\ by\ Andrew\ Somers.\ All\ Rights\ Reserved.} \\
\\
\end{align}
```

----

For more on APCA, please see: [git.myndex.com](https://git.myndex.com) for more.

Copyright © 2019-2022 by Andrew Somers. All Rights Reserved.

NOTICE: "APCA is a method for predicting text contrast on self-illuminated displays for web-based content. Some use-cases are prohibited by license, including the following: use in medical, clinical evaluation, human safety related, aerospace, transportation, military applications, are strictly prohibited without a specific license in writing granting such use."
