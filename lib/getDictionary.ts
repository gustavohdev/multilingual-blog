const dictionaries = {
    en: () => import("./../dictionaries/en.json").then((module) => module.default)
    de: () => import("./../dictionaries/de.json").then((module) => module.default)
}

const getDictionary = async (locale: string) => {
    if(!locale || locale === undefined) return dictionaries["en"]
    return dictionaries[locale as "en" || "de"]
}