# LaTeX of the APCA-W3 Base Formula

$$
\begin{align} \\
\mathbf{APCA}\ & \mathbf{\bullet \ W3}\ \ \mathbf{\scriptstyle  version\  { 0.1.9}\ { developed\  for\  WCAG\  3\  contrast\  guidelines}} \\
{\scriptstyle Using:} & {\scriptstyle APCA\ Contrast\ Prediction\ Equation\ \ 0.0.98G-4g-base} \\\\[1.25ex]
Perceptual&\ Lightness\ Contrast = L^c \\\\
\textstyle Where: \quad & \\\\[1.25ex]
\hline
{\scriptstyle Clamp\ Minimu}&{\scriptstyle m\ Contrast\ Then\ Offset} \\
L^c = & \begin{cases}
  0.0 \  \                                       &if\  \vert S_{apc} \vert < P_{out} \\
  S_{apc} - W_{offset} \ \                                  &if\  \  S_{apc}\ > 0  \\
  S_{apc} + W_{offset} \ \                                  &if\  \  S_{apc}\ < 0 \\
\end{cases} \\\\[1.25ex]
\hline 
{\textstyle Determine} & \ {\textstyle Polarity\ \\&amp; \ Find\ Lightness\ Difference} \\
S_{apc} = &\begin{cases}
\big(\ Y_{bg}^{0.56} - Y_{txt}^{0.57}\ \big) \times W_{scale} \quad &if\  Y_{bg}\ >\ Y_{txt}\ \Big(\ ^{\ \ Normal\ Polarity}\_{(dark\ text/light\ bg)} \Big) \\\\[2ex]
\big(\ Y_{bg}^{0.65} - Y_{txt}^{0.62}\ \big) \times W_{scale} \quad &if\  Y_{bg}\ <\ Y_{txt}\ \Big(\ ^{\  Reverse\ Polarity}\_{(light\ text/dark\ bg)} \Big) \\
\end{cases}  \\\\[2.25ex]
\hline
{\scriptstyle Soft\ Clamp\ Bla}&{\scriptstyle ck\ Levels} \\
Y_{txt} = &\ f_{clamp}(Y_s) \quad_{of\ the\ text,\ symbol,\ or\ object.}^{where\ Y_s\ is\ derived\ from\ the\ color} \\\\[1.4ex]
Y_{bg} = &\ f_{clamp}(Y_s) \quad_{used\ for\ the\ adjacent\ background.}^{where\ Y_s\ is\ derived\ from\ the\ color} \\\\[1.4ex]
Y_{fld} = &\ \mathit{Unused\ in\ W3\ version} \\\\[2ex]
f_{clamp}(Y_c) = &\begin{cases}
  Y_c  \ \quad                               &if\  Y_c  >=  B_{thrsh} \\
  Y_c + \big( B_{thrsh} - Y_c \big)^{B_{exp}} &if\  Y_c  <  B_{thrsh} \\
\end{cases}  \\\\[1.25ex]
\hline
Constan&ts: \\
&\begin{alignedat}{2}
{\scriptstyle Powercur} & {\scriptstyle ve\ Exponents} \quad \quad \quad & \quad {\scriptstyle Clamp} & {\scriptstyle s\ \\\& \ Scalers} \\
S_{TRC} & = 2.4  \quad & \quad  B_{clmp} & = \  1.414 \\
Nm_{TX} & = 0.57 \quad & \quad  B_{thrsh} & = \  0.022 \\
Nm_{BG} & = 0.56 \quad & \quad  W_{scale} & = \  1.14 \\
Rv_{TX} & = 0.62 \quad & \quad  W_{offset} & = \  0.027 \\
Rv_{BG} & = 0.65 \quad & \quad  W_{clip} & = \  0.1  \\
\end{alignedat} \\\\[1.25ex]
\\
\hline 
{\scriptstyle Estimate\ }&{\scriptstyle Screen\ Luminance} \\
Y_s = \displaystyle\sum &\begin{cases} 
{\color{DarkRed}(\mathbf R^\prime \div 255.0)^{2.4} \times 0.2126729 } \\
{\color{DarkGreen}(\mathbf G^\prime \div 255.0)^{2.4} \times 0.7151522} \\
{\color{Blue}(\mathbf B^\prime \div 255.0)^{2.4} \times 0.0721750} \\ 
\end{cases}  \\\\[1.25ex]
\hline
\color{DarkRed}R^\prime, \color{DarkGreen}G^\prime, \color{Blue}B^\prime &\ {\in}\ \mathbf sRGB  \\\\[1.25ex]
\hline 
\  GitHub Repo & \Rrightarrow \mathrm https://apcaw3.myndex.com  \\
\\
\end{align}
$$




Copyright © 2019-2022 by Andrew Somers. All Rights Reserved.
  
