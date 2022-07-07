# LaTeX of the APCA-W3 Base Formula

$$
\begin{align} \\
\mathbf{APCA}\ & \mathbf{\bullet \ W3}\ \ \mathbf{\scriptstyle version\ { 0.1.9}\ { developed\ for\ WCAG\  3\ contrast\ guidelines}} \\
{\scriptstyle Using:}\ &\ {\scriptstyle APCA\ Contrast\ Prediction\ Equation\ \ 0.0.98G-4g-base-W3} \\\\[4ex]
&Perceptual\ Lightness\ Contrast = L^c \\\\[2.5ex]
\textstyle Wher&e: \\\\[1ex]
\hline
{\scriptstyle Clamp\ } & {\scriptstyle Minimum\ Contrast\ to\ 10 \\\% \ then\ Offset\ \\&amp;\ Final\ Scale} \\
L^c = &\begin{cases}
  \ 0.0 \  \  \                                      &if\ \big\vert S_{apc} \big\vert < W_{clamp}\\\\[1ex]
  \big(\ S_{apc} - W_{offset}\ \big) \times 100.0\ \ &if\ \ S_{apc}\ > 0 \\\\[1ex]
  \big(\ S_{apc} + W_{offset}\ \big) \times 100.0\ \ &if\ \ S_{apc}\ < 0 \\
\end{cases} \\\\[1.25ex]
\hline 
{\scriptstyle Determ} & {\scriptstyle ine\ Polarity,\ Find\ Lightness\ Difference,\ \\&amp;\ Scale} \\
S_{apc} = &\begin{cases}
\big(\ Y_{bg}^{Nbg} - Y_{txt}^{Ntx}\ \big) \times W_{scale} \ \ &if\ \ Y_{bg} > Y_{txt}\ \Big(\ ^{\ \ Normal\ Polarity}\_{(dark\ text/light\ bg)} \Big) \\\\[1ex]
\big(\ Y_{bg}^{Rbg} - Y_{txt}^{Rtx}\ \big) \times W_{scale} \ \ &if\ \ Y_{bg} < Y_{txt}\ \Big(\ ^{\  Reverse\ Polarity}\_{(light\ text/dark\ bg)} \Big) \\
\end{cases}  \\\\[2.25ex]
\hline
{\scriptstyle Soft\ Cl}&{\scriptstyle ip\ \\&amp;\ Clamp\ Black\ Levels} \\
Y_{txt}& = \ f_{softclp}(Ys) \quad_{of\ the\ text,\ symbol,\ or\ object.}^{Where\ Ys\ is\ derived\ from\ the\ color} \\\\[1.4ex]
Y_{bg}& = \ f_{softclp}(Ys) \quad_{used\ for\ the\ adjacent\ background.}^{Where\ Ys\ is\ derived\ from\ the\ color} \\\\[1.4ex]
Y_{fld}& = \ \mathrm{\scriptstyle Unused\ in\ W3\ version} \\\\[2ex]
f_{softclp}&(Y_c) = \begin{cases}
  0.0   \ \quad                                \ &if\ \ Y_c  <  0.0 \\\\[0.66ex]
  Y_c + \big( B_{thrsh} - Y_c \big)^{B_{clip}} \ &if\ \ Y_c  <  B_{thrsh} \\\\[0.66ex]
  Y_c   \ \quad                                \ &Otherwise \\
\end{cases}  \\\\[1ex]
\hline
{\scriptstyle Estim}&{\scriptstyle ate\ Screen\ Luminance Using sRGB Coefficients} \\
Ys &= \displaystyle\sum \begin{cases} 
{\color{RubineRed}(\mathbf R^\prime \div 255.0)^{S_{TRC}} \times 0.2126729 } \\
{\color{YellowGreen}(\mathbf G^\prime \div 255.0)^{S_{TRC}} \times 0.7151522} \\
{\color{Cerulean}(\mathbf B^\prime \div 255.0)^{S_{TRC}} \times 0.0721750} \\ 
\end{cases}  \\\\[1.5ex]
\hline 
Const&ants for 0.0.98G-4g-sRGB: \\
&\begin{alignedat}{2}
{\scriptstyle Powercur} & {\scriptstyle ve\ Exponents} \quad \quad & \quad {\scriptstyle Clamp} & {\scriptstyle s\ \\\& \ Scalers} \\
S_{TRC} & = 2.4 \quad & \quad  B_{clip} & = \  1.414 \\
   Ntx & = 0.57 \quad & \quad  B_{thrsh} & = \  0.022 \\
   Nbg & = 0.56 \quad & \quad  W_{scale} & = \  1.14 \\
   Rtx & = 0.62 \quad & \quad  W_{offset} & = \  0.027 \\
   Rbg & = 0.65 \quad & \quad  W_{clamp} & = \  0.1  \\
\end{alignedat} \\ \\
\hline \\
IN&PUT:\ \ {\color{RubineRed}R^\prime}, G^\prime, {\color{Cerulean}B^\prime}\ \mathbf{\in\ sRGB} \ \ (Range: 0.0-255.0) \\\\[2ex]
\hline 
\  Git&HubRepo\  \Rrightarrow\  \mathrm{https://apcaw3.myndex.com}  \\
\\
\end{align}
$$




Copyright © 2019-2022 by Andrew Somers. All Rights Reserved.
  
