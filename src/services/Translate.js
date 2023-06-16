const url = 'https://google-translate105.p.rapidapi.com/v1/rapid/translate'

export function translate (text, sourceLang, targetLang) {
  const options = {
    method: 'POST',
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      'X-RapidAPI-Key': '5da1e5f960msh95b460534b841edp10aad7jsnd97984e4d074',
      'X-RapidAPI-Host': 'google-translate105.p.rapidapi.com'
    },
    body: new URLSearchParams({
      text,
      to_lang: targetLang,
      from_lang: sourceLang
    })
  }

  return fetch(url, options).then(res => res.json())
}
