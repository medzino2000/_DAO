import React from 'react'
import NationalityList from '../../constants/NationalityList'
import save_updates_icon from '../../../assets/images/general_icons/Save.png'
import Image from 'next/image'

const styles = {
  gray_input:
    'rounded-lg bg-input-background py-3 px-3 text-xs placeholder:text-xs text-gray-400 placeholder:text-gray-400',
  gray_input_label: 'text-orange-FIDIS font-semibold block mb-2',
}

const BusinessAccountSettings = () => {
  const company_infos = [
    { id: 'company_name', text: 'Company Name', placeholder: 'john' },
    { id: 'ein', text: 'EIN', placeholder: 'john' },
    {
      id: 'company_email',
      text: 'Company Email',
      placeholder: 'John.smith@email.com',
    },
  ]
  return (
    <form>
      <section className="scrolltype relative -top-5 flex max-h-[70%] flex-col gap-8 overflow-y-auto pr-8">
        <div className="flex">
          <div id="wallet_address">
            <label htmlFor="wallet_address" className={styles.gray_input_label}>
              Wallet Address
            </label>
            <input
              type="text"
              name="wallet_address"
              id="wallet_address"
              className={styles.gray_input}
              placeholder="0x3Bf4CA8e5CA8e5CA8e5CA8e5CA8e5"
              disabled
            />
          </div>
        </div>
        <div className="flex gap-8">
          {company_infos.map((data, index) => (
            <div key={index}>
              <label htmlFor={data.id} className={styles.gray_input_label}>
                {data.text}
              </label>
              <input
                type="text"
                name={data.id}
                id={data.id}
                className={styles.gray_input}
                placeholder={data.placeholder}
              />
            </div>
          ))}
        </div>
        <div className="flex items-center gap-8">
          <div id="date_of_birth">
            <label htmlFor="date_of_birth" className={styles.gray_input_label}>
              Birth Day
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="MM"
                id="date_of_birth_month"
                name="date_of_birth_month"
                className={styles.gray_input + ' w-12'}
              ></input>
              <input
                type="text"
                placeholder="DD"
                id="date_of_birth_day"
                name="date_of_birth_day"
                className={styles.gray_input + ' w-12'}
              ></input>
              <input
                type="text"
                placeholder="YYYY"
                id="date_of_birth_year"
                name="date_of_birth_year"
                className={styles.gray_input + ' w-20'}
              ></input>
            </div>
          </div>
          <div id="citizenship">
            <label htmlFor="citizenship" className={styles.gray_input_label}>
              Citizenship
            </label>
            <NationalityList className={styles.gray_input + ' w-36'} />
          </div>
          <div id="id_type">
            <label htmlFor="id_type" className={styles.gray_input_label}>
              ID Type
            </label>
            <select name="nationality" className={styles.gray_input}>
              <option value="">SSN</option>
              <option value="idk">idk</option>
              <option value="idk">idk</option>
              <option value="idk">idk</option>
              <option value="idk">idk</option>
              <option value="idk">idk</option>
            </select>
          </div>
          <div id="id_number">
            <label htmlFor="id_number" className={styles.gray_input_label}>
              ID Number
            </label>
            <input
              type="text"
              id="id_number"
              name="id_number"
              className={styles.gray_input + ' w-28'}
              placeholder="LTS123728673"
            ></input>
          </div>
          <div id="id_photo">
            <label htmlFor="id_photo" className={styles.gray_input_label}>
              ID Photo
            </label>
            <input
              type="file"
              accept="image/*"
              id="id_photo"
              style={{ display: 'none' }}
              name="id_photo"
              className={styles.gray_input + ' w-28 cursor-pointer'}
              // value="upload"
            />
            <label htmlFor="id_photo">
              <button className={styles.gray_input + ' w-28 cursor-pointer'}>
                Upload
              </button>
            </label>
          </div>
        </div>
        <div className="flex items-center gap-8">
          <div id="home_address">
            <label htmlFor="home_address" className={styles.gray_input_label}>
              Company Address
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="House Number"
                id="house_number"
                name="house_number"
                className={styles.gray_input + ' w-32'}
              ></input>
              <input
                type="text"
                placeholder="Street"
                id="street"
                name="street"
                className={styles.gray_input + ' w-40'}
              ></input>
              <input
                type="text"
                placeholder="City"
                id="city"
                name="city"
                className={styles.gray_input + ' w-36'}
              ></input>
              <input
                type="text"
                placeholder="State"
                id="state"
                name="state"
                className={styles.gray_input + ' w-36'}
              ></input>
              <input
                type="text"
                placeholder="Zip Code"
                id="zip_code"
                name="zip_code"
                className={styles.gray_input + ' w-20'}
              ></input>
              <input
                type="text"
                placeholder="Country"
                id="country"
                name="country"
                className={styles.gray_input + ' w-20'}
              ></input>
            </div>
          </div>
        </div>
      </section>
      <div id="save_changes" className="mt-6 flex w-full justify-end">
        <button className="flex items-center gap-3 rounded-full bg-orange-FIDIS px-2 py-1.5 font-medium">
          <Image
            src={save_updates_icon}
            height={20}
            width={20}
            alt="save changes icon"
          />
          Save Changes
        </button>
      </div>
    </form>
  )
}

export default BusinessAccountSettings