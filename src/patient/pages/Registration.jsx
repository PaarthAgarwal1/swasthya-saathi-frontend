import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import useTextToSpeech from '../../components/TextToSpeech';
import { useEffect } from 'react';


const Registration = () => {
  const { t, i18n } = useTranslation();
  const speakText = useTextToSpeech(i18n.language); // Initialize text-to-speech hook

  useEffect(() => {
      // Speak the main heading and subheading on page load
      speakText(`${t('registration_page.page_title')}`);
    }, [speakText, t, i18n.language]);


  const navigate = useNavigate();
  const location = useLocation();
  const patientId = location.state?.patientId;

  const initialValues = {
    name: '',
    gender: '',
    age: '',
    phone: '',
    relativePhone: '000000000',
    email: '',
    address: ''
  };

  const validationSchema = Yup.object({
    name: Yup.string().required(t('registration_page.validation_errors.required')),
    gender: Yup.string().required(t('registration_page.validation_errors.required')),
    age: Yup.number().required(t('registration_page.validation_errors.required')).positive().integer(),
    phone: Yup.string().required(t('registration_page.validation_errors.required')),
    alternatePhone: Yup.string().matches(/^\d{10}$/, t('registration_page.validation_errors.phone_invalid')),
    email: Yup.string().email(t('registration_page.validation_errors.email_invalid')).required(t('registration_page.validation_errors.required')),
    address: Yup.string().required(t('registration_page.validation_errors.required'))
  });

  const onSubmit = (values) => {
    console.log('Form data', values);
    navigate('/doctor-ai');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 to-purple-600 py-5">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl px-8 py-4">
        <h1
          className="text-2xl font-bold mb-6"
          onMouseEnter={() => speakText(t('registration_page.page_title'))}
        >
          {t('registration_page.page_title')}
        </h1>
        <p
          className="text-gray-600 mb-6"
          onMouseEnter={() => speakText(`${t('registration_page.patient_id_label')} ${patientId || ''}`)}
        >
          {t('registration_page.patient_id_label')} {patientId}
        </p>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {() => (
            <Form className="space-y-2">
              <div>
                <label
                  className="block text-sm font-medium text-gray-700 mb-2"
                  onMouseEnter={() => speakText(t('registration_page.form_labels.name'))}
                >
                  {t('registration_page.form_labels.name')}
                </label>
                <Field
                  type="text"
                  name="name"
                  className="w-full p-3 border rounded-lg"
                />
                <ErrorMessage name="name" component="div" className="text-red-500" />
              </div>

              <div className="flex gap-4">
                <div className="w-1/2">
                  <label
                    className="block text-sm font-medium text-gray-700 mb-2"
                    onMouseEnter={() => speakText(t('registration_page.form_labels.gender'))}
                  >
                    {t('registration_page.form_labels.gender')}
                  </label>
                  <Field as="select" name="gender" className="w-full p-3 border rounded-lg">
                    {t('registration_page.gender_options', { returnObjects: true }).map((option, index) => (
                      <option key={index} value={option.toLowerCase()}>
                        {option}
                      </option>
                    ))}
                  </Field>

                  <ErrorMessage name="gender" component="div" className="text-red-500" />
                </div>

                <div className="w-1/2">
                  <label
                    className="block text-sm font-medium text-gray-700 mb-2"
                    onMouseEnter={() => speakText(t('registration_page.form_labels.age'))}
                  >
                    {t('registration_page.form_labels.age')}
                  </label>
                  <Field
                    type="number"
                    name="age"
                    className="w-full p-3 border rounded-lg"
                  />
                  <ErrorMessage name="age" component="div" className="text-red-500" />
                </div>
              </div>

              <div>
                <label
                  className="block text-sm font-medium text-gray-700 mb-2"
                  onMouseEnter={() => speakText(t('registration_page.form_labels.phone'))}
                >
                  {t('registration_page.form_labels.phone')}
                </label>
                <Field
                  type="text"
                  name="phone"
                  className="w-full p-3 border rounded-lg"
                />
                <ErrorMessage name="phone" component="div" className="text-red-500" />
              </div>

              <div>
                <label
                  className="block text-sm font-medium text-gray-700 mb-2"
                  onMouseEnter={() => speakText(t('registration_page.form_labels.relative_phone'))}
                >
                  {t('registration_page.form_labels.relative_phone')}
                </label>
                <Field
                  type="text"
                  name="relativePhone"
                  className="w-full p-3 border rounded-lg"
                />
                <ErrorMessage name="relativePhone" component="div" className="text-red-500" />
              </div>

              <div>
                <label
                  className="block text-sm font-medium text-gray-700 mb-2"
                  onMouseEnter={() => speakText(t('registration_page.form_labels.email'))}
                >
                  {t('registration_page.form_labels.email')}
                </label>
                <Field
                  type="email"
                  name="email"
                  className="w-full p-3 border rounded-lg"
                />
                <ErrorMessage name="email" component="div" className="text-red-500" />
              </div>

              <div>
                <label
                  className="block text-sm font-medium text-gray-700 mb-2"
                  onMouseEnter={() => speakText(t('registration_page.form_labels.address'))}
                >
                  {t('registration_page.form_labels.address')}
                </label>
                <Field
                  as="textarea"
                  name="address"
                  className="w-full p-3 border rounded-lg"
                />
                <ErrorMessage name="address" component="div" className="text-red-500" />
              </div>

              <button
                type="submit"
                className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800"
                onMouseEnter={() => speakText(t('registration_page.submit_button'))}
              >
                {t('registration_page.submit_button')}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Registration;
