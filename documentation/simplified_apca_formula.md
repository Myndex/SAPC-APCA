
## APCA Simplified LaTeX Version

```math
% APCA-W3 Contrast Prediction Equation, 0.0.98G-4g-base-W3 (sRGB)
% Reverse (bottom-up) notation. Constants frozen 2021-02-15.

\begin{align}
%---- Step 4: clamp minimum contrast, offset, and final scale ----
L^c &=
\begin{cases}
0 & \text{if } \bigl| S_{apc} \bigr| < W_{clamp} \\[1ex]
\bigl(\, S_{apc} - \mathrm{sgn}(S_{apc})\, W_{offset} \,\bigr) \times 100
  & \text{otherwise}
\end{cases}
\\[2.5ex]
%---- Step 3: polarity, perceptual lightness difference, scale ----
S_{apc} &=
\begin{cases}
\bigl(\, Y_{bg}^{\,N_{bg}} - Y_{txt}^{\,N_{txt}} \,\bigr)\, W_{scale}
  & \text{if } Y_{bg} > Y_{txt} \quad \text{(normal: dark text, light bg)} \\[1ex]
\bigl(\, Y_{bg}^{\,R_{bg}} - Y_{txt}^{\,R_{txt}} \,\bigr)\, W_{scale}
  & \text{if } Y_{bg} < Y_{txt} \quad \text{(reverse: light text, dark bg)}
\end{cases}
\\[2.5ex]
%---- Step 2: soft clip and clamp black levels ----
& Y_{txt} = f_{sc}(Y_s)\,, \qquad Y_{bg} = f_{sc}(Y_s)
\\[1ex]
f_{sc}(Y) &=
\begin{cases}
0 & \text{if } Y < 0 \\[0.5ex]
Y + \bigl( B_{thrsh} - Y \bigr)^{B_{clip}} & \text{if } 0 \le Y < B_{thrsh} \\[0.5ex]
Y & \text{otherwise}
\end{cases}
\\[2.5ex]
%---- Step 1: estimated screen luminance from sRGB ----
Y_s &= 0.2126729 \left( \frac{R'}{255} \right)^{\!S_{trc}}
     + 0.7151522 \left( \frac{G'}{255} \right)^{\!S_{trc}}
     + 0.0721750 \left( \frac{B'}{255} \right)^{\!S_{trc}}
\end{align}
```

```math
% Constants for 0.0.98G-4g-sRGB
\begin{alignedat}{2}
&\text{Powercurve exponents:} \qquad && \text{Clamps and scalers:} \\
&S_{trc} = 2.4  && B_{clip}   = 1.414 \\
&N_{txt} = 0.57 && B_{thrsh}  = 0.022 \\
&N_{bg}  = 0.56 && W_{scale}  = 1.14 \\
&R_{txt} = 0.62 && W_{offset} = 0.027 \\
&R_{bg}  = 0.65 && W_{clamp}  = 0.1
\end{alignedat}
```

Input: $`R', G', B' \in`$ sRGB, range 0.0–255.0.



For more on APCA, please see: [git.myndex.com](https://git.myndex.com) for more.

Copyright © 2019-2026 by Andrew Somers. All Rights Reserved.
