import { log } from "console"


const getPredictedAge = async (name: string) => {
  const res = await fetch(`https://api.agify.io/?name=${name}`)
  return res.json()
}
const getPredictedGender = async (name: string) => {
  const res = await fetch(`https://api.genderize.io/?name=${name}`)
  return res.json()
}
const getPredictedCountry = async (name: string) => {
  const res = await fetch(`https://api.nationalize.io/?name=${name}`)
  return res.json()
}

interface Params {
  params: { name: string };
}

export default async function Page({ params }: Params) {
  const ageData = getPredictedAge(params.name)
  const genderData = getPredictedGender(params.name)
  const countryData = getPredictedCountry(params.name)

  const [age, gender, country] = await Promise.all([
    ageData,
    genderData,
    countryData
  ])

  // console.log(age, gender, country);

  return (
    <main style={{ minHeight: '100vh' }} className="flex justify-center items-center flex-col">
      <h1 className="text-8xl font-bold border border-dashed p-5">{params.name}</h1>
      <div style={{ fontSize: '2em' }} className="border-b-4 mb-5"> Predicted Personal Info</div>
      {
        age?.error || gender?.error || country?.error ?
          <div className="text-red-600">
            Limit Reached for today
          </div>
          :
          <div style={{ fontSize: '1.2em' }}>
            <h3>Age : <span>{age?.age}</span></h3>
            <h3>Gender : <span className="uppercase">{gender?.gender}</span></h3>
            <h3>Country : {country?.country?.[0].country_id}</h3>
          </div>
      }
    </main>
  );
}