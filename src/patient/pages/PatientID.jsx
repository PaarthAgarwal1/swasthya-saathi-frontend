import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import useTextToSpeech from '../../components/TextToSpeech';
import { useEffect } from 'react';


const PatientId = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const speakText = useTextToSpeech(i18n.language);
  
  useEffect(() => {
        // Speak the main heading and subheading on page load
        speakText(`${t('patient_id_page.page_title')}`);
      }, [speakText, t, i18n.language]);

  const formik = useFormik({
    initialValues: {
      existingId: '',
    },
    validationSchema: Yup.object({
      existingId: Yup.string()
        .required(t('patient_id_page.validation_errors.required'))
        .matches(/^[A-Za-z0-9]+$/, t('patient_id_page.validation_errors.invalid_format')),
    }),
    onSubmit: (values) => {
      navigate('/doctor-ai');
    },
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
        <div className="mb-8">
          <h2
            className="text-2xl font-bold text-gray-800 mb-4"
            onMouseEnter={() => speakText(t('patient_id_page.page_title'))}
          >
            {t('patient_id_page.page_title')}
          </h2>

          <form onSubmit={formik.handleSubmit}>
            <input
              type="text"
              id="existingId"
              name="existingId"
              value={formik.values.existingId}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder={t('patient_id_page.patient_id_placeholder')}
              className={`w-full p-3 border rounded-lg mb-2 ${
                formik.touched.existingId && formik.errors.existingId
                  ? 'border-red-500'
                  : 'border-gray-300'
              }`}
              onMouseEnter={() => speakText(t('patient_id_page.patient_id_placeholder'))}
            />
            {formik.touched.existingId && formik.errors.existingId ? (
              <div
                className="text-red-500 text-sm mb-4"
                onMouseEnter={() => speakText(formik.errors.existingId)}
              >
                {formik.errors.existingId}
              </div>
            ) : null}
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 text-center block"
              onMouseEnter={() => speakText(t('patient_id_page.continue_button'))}
            >
              {t('patient_id_page.continue_button')}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PatientId;
