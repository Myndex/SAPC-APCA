# LaTeX of the Base Formula

**Here is some math!**

```math
\sqrt{3}
```



```math
\begin{align}
\\
\ \ \mathbf{APCA} \mathbf{\bullet W3}\ \  &\mathbf{\scriptstyle  version\  { 0.1.7}\ { developed\  for\  WCAG\  3\  contrast\  guidelines}} \\[0.66ex]
{\scriptstyle Using:} \quad  \quad  \quad \quad & \\
\ \ {APCA}\   Contr&ast\ {Prediction\ Equation\ \ 0.0.98G-4g-base} \\
\\
Result:\  & \begin{bmatrix} \hline
{\scriptstyle Lightness\ Contrast} \\
\quad L\!^c  = \ S_{apc} \ \boldsymbol\times \ 100 \quad \\
\hline \end{bmatrix} \\
\\
\textstyle Where: \quad & \\
\hline 
{\scriptstyle Clamp\ Mi}&{\scriptstyle nimum\ Contrast\ Then\ Offset} \\[1.25ex]
S_{apc} = & \begin{cases}
  0.0 \  \                                       &\vert C \vert < P_{out} \\
  C - W_{offset} \ \                                  &\  C\ > 0  \\
  C + W_{offset} \ \                                  &\  C\ < 0 \\
\end{cases}\\
\hline 
{\scriptstyle Clamp\ No}&{\scriptstyle ise\ Then\ Scale} \\[1.25ex]
C = &\begin{cases}
  0.0  \ \                      &\bigg \vert Y_{bg} - Y_{txt} \bigg \vert     < P_{in} \\
  S_{norm} \times R_{scale}  \ \  &\ Y_{txt}  < Y_{bg}  \\
  S_{rev}  \times R_{scale}  \ \  &\ Y_{txt}  > Y_{bg}  \\
\end{cases}\\
\hline 
{\textstyle Find\ }&{\textstyle Perceptual\ Lightness\ Difference} \\[0.75ex]
&{\scriptstyle Normal\ Polarity\ (dark\  text/light\ bg)} \\
S_{norm} = &\ Y_{bg}^{0.56} - Y_{txt}^{0.57} \quad\ _{Normal:\ Y_{bg}\ >\ Y_{txt}} \\[0.75ex]
&{\scriptstyle Reverse\ Polarity\ (light\  text/dark\ bg)} \\
S_{rev} = &\ Y_{bg}^{0.65} - Y_{txt}^{0.62}  \quad\ _{Reverse:\ Y_{bg}\ <\ Y_{txt}} \\
\hline 
{\scriptstyle Soft\ Clam}&{\scriptstyle p\ Black\ Levels} \\[1.25ex]
Y_{txt} = &\ f_{clamp}(Y) \quad _{color\ of\ the\ text,\ symbol,\ or\ object.}^{where\ Y\ is\ derived\ from\  the} \\[1.1ex]
Y_{bg} = &\ f_{clamp}(Y) \quad _{color\ used\ for\ the\ background.}^{where\ Y\ is\ derived\ from\  the}
\\[0.66ex]

f_{clamp}(Y_c) = &\begin{cases}
  Y_c  \ \                        & Y_c  >=  B_{thrsh} \\
  Y_c + \big ( B_{thrsh} - Y_c \big )^{Bexp} & Y_c  <  B_{thrsh} \\
\end{cases}\\
\hline 
{\scriptstyle Constants}&{\scriptstyle \ for\ Clamps\ and\ Scalers} \\[1.25ex]
& \begin{align}
B_{exp} =&\  1.414  &  R_{scale} = & \  1.14 \\
B_{thresh} =&\  0.022 &  W_{offset} = & \  0.027 \\
P_{in} =&\  0.0005 & P_{out} = & \  0.1 \\
\end{align}\\

\hline
{\scriptstyle Estimate\ }&{\scriptstyle Screen\ Luminance} \\[1.25ex]
\definecolor{DarkGreen}{rgb}{0,0.35,0}
\definecolor{DarkRed}{rgb}{0.6,0,0}
Y_s = \textstyle \sum &\begin{cases} 
{\color{DarkRed}(\mathbf R^\prime \div 255.0)^{2.4} \times 0.2126729 } \\
{\color{DarkGreen}(\mathbf G^\prime \div 255.0)^{2.4} \times 0.7151522} \\
{\color{Blue}(\mathbf B^\prime \div 255.0)^{2.4} \times 0.0721750} \\ 
\end{cases}\\[1.25ex]
{\{\color{DarkRed}R^\prime, \color{DarkGreen}G^\prime, \color{Blue}B^\prime\}}&\ {\in}\ \mathbf sRGB \\
\hline \\
\  GitHub Repo & \Rrightarrow \mathrm{https:\!//apcaw3.myndex.com}  \\[0.75ex]
\\
\end{align}
```


Copyright © 2019-2022 by Andrew Somers. All Rights Reserved.
  
