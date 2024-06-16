interface TyporgraphyPropsI {
  text: string
}

export function TypographyH1({text}: TyporgraphyPropsI) {
  return <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">{text}</h1>
}

export function TypographyH2({text}: TyporgraphyPropsI) {
  return <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 mb-3">{text}</h2>
}

export function TypographyH3({text}: TyporgraphyPropsI) {
  return <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight mb-3">{text}</h3>
}
