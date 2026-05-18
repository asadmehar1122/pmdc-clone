import { useState } from 'react'
import Link from 'next/link'
import { Save, X } from 'lucide-react'

export const emptyResultForm = {
  categorySlug: 'NLEStepOne',
  rollNumber: '',
  candidateName: '',
  fatherName: '',
  cnic: '',
  session: '',
  obtainedMarks: '',
  totalMarks: '',
  status: 'Pass',
  remarks: '',
}

const categoryOptions = [
  // { value: 'MDCATResult', label: 'MDCAT Results' },
  // { value: 'NLEStepTwo', label: 'NEB Results' },
  { value: 'NLEStepOne', label: 'NRE Step 1 Results' },
]

const statusOptions = [
  { value: 'Pass', label: '✓ Pass' },
  { value: 'Fail', label: '✗ Fail' },
  { value: 'Absent', label: '- Absent' },
]

export default function ResultForm({
  initialValue = emptyResultForm,
  submitLabel = 'Save Result',
  onSubmit,
  loading = false,
  helpText = '',
  cancelHref = '/admin/results',
  cancelLabel = 'Cancel',
}) {
  const [formValue, setFormValue] = useState(initialValue || emptyResultForm)
  const [validationErrors, setValidationErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormValue((prev) => ({
      ...prev,
      [name]: value,
    }))
    // Clear validation error when field is changed
    if (validationErrors[name]) {
      setValidationErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const validateForm = () => {
    const errors = {}

    if (!formValue.categorySlug?.trim()) {
      errors.categorySlug = 'Category is required'
    }
    if (!formValue.rollNumber?.trim()) {
      errors.rollNumber = 'Roll number is required'
    }
    if (!formValue.candidateName?.trim()) {
      errors.candidateName = 'Candidate name is required'
    }
    if (formValue.obtainedMarks && formValue.totalMarks) {
      const obtained = parseFloat(formValue.obtainedMarks)
      const total = parseFloat(formValue.totalMarks)
      if (isNaN(obtained) || isNaN(total)) {
        errors.marks = 'Marks must be numeric values'
      } else if (obtained > total) {
        errors.marks = 'Obtained marks cannot exceed total marks'
      }
    }

    setValidationErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    onSubmit(formValue)
  }

  const hasErrors = Object.keys(validationErrors).length > 0

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Help Text */}
      {helpText && (
        <div className="rounded-lg bg-blue-50 border border-blue-200 p-4">
          <p className="text-sm text-blue-800">{helpText}</p>
        </div>
      )}

      {/* Validation Errors Summary */}
      {hasErrors && (
        <div className="rounded-lg bg-red-50 border border-red-200 p-4">
          <p className="text-sm font-semibold text-red-800 mb-2">Please fix the following errors:</p>
          <ul className="space-y-1">
            {Object.entries(validationErrors).map(([field, error]) => (
              <li key={field} className="text-sm text-red-700">
                • {error}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Form Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Category Slug */}
        <div>
          <label htmlFor="categorySlug" className="block text-sm font-semibold text-pmdcInk mb-2">
            Category <span className="text-red-500">*</span>
          </label>
          <select
            id="categorySlug"
            name="categorySlug"
            value={formValue.categorySlug}
            onChange={handleChange}
            disabled={loading}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pmdcSky focus:border-transparent outline-none transition ${
              validationErrors.categorySlug ? 'border-red-500 bg-red-50' : 'border-slate-300'
            }`}
          >
            {categoryOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          {validationErrors.categorySlug && (
            <p className="mt-1 text-xs text-red-600">{validationErrors.categorySlug}</p>
          )}
        </div>

        {/* Roll Number */}
        <div>
          <label htmlFor="rollNumber" className="block text-sm font-semibold text-pmdcInk mb-2">
            Roll Number <span className="text-red-500">*</span>
          </label>
          <input
            id="rollNumber"
            type="text"
            name="rollNumber"
            value={formValue.rollNumber}
            onChange={handleChange}
            placeholder="e.g., A-12345"
            disabled={loading}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pmdcSky focus:border-transparent outline-none transition ${
              validationErrors.rollNumber ? 'border-red-500 bg-red-50' : 'border-slate-300'
            }`}
          />
          {validationErrors.rollNumber && (
            <p className="mt-1 text-xs text-red-600">{validationErrors.rollNumber}</p>
          )}
        </div>

        {/* Candidate Name */}
        <div>
          <label htmlFor="candidateName" className="block text-sm font-semibold text-pmdcInk mb-2">
            Candidate Name <span className="text-red-500">*</span>
          </label>
          <input
            id="candidateName"
            type="text"
            name="candidateName"
            value={formValue.candidateName}
            onChange={handleChange}
            placeholder="Full name"
            disabled={loading}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pmdcSky focus:border-transparent outline-none transition ${
              validationErrors.candidateName ? 'border-red-500 bg-red-50' : 'border-slate-300'
            }`}
          />
          {validationErrors.candidateName && (
            <p className="mt-1 text-xs text-red-600">{validationErrors.candidateName}</p>
          )}
        </div>

        {/* Father Name */}
        <div>
          <label htmlFor="fatherName" className="block text-sm font-semibold text-pmdcInk mb-2">
            Father Name
          </label>
          <input
            id="fatherName"
            type="text"
            name="fatherName"
            value={formValue.fatherName}
            onChange={handleChange}
            placeholder="Father's name"
            disabled={loading}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-pmdcSky focus:border-transparent outline-none transition"
          />
        </div>

        {/* CNIC */}
        <div>
          <label htmlFor="cnic" className="block text-sm font-semibold text-pmdcInk mb-2">
            CNIC
          </label>
          <input
            id="cnic"
            type="text"
            name="cnic"
            value={formValue.cnic}
            onChange={handleChange}
            placeholder="e.g., 12345-6789012-3"
            disabled={loading}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-pmdcSky focus:border-transparent outline-none transition"
          />
        </div>

        {/* Session */}
        <div>
          <label htmlFor="session" className="block text-sm font-semibold text-pmdcInk mb-2">
            Session
          </label>
          <input
            id="session"
            type="text"
            name="session"
            value={formValue.session}
            onChange={handleChange}
            placeholder="e.g., 2024"
            disabled={loading}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-pmdcSky focus:border-transparent outline-none transition"
          />
        </div>

        {/* Obtained Marks */}
        <div>
          <label htmlFor="obtainedMarks" className="block text-sm font-semibold text-pmdcInk mb-2">
            Obtained Marks
          </label>
          <input
            id="obtainedMarks"
            type="number"
            name="obtainedMarks"
            value={formValue.obtainedMarks}
            onChange={handleChange}
            placeholder="0"
            disabled={loading}
            step="0.01"
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-pmdcSky focus:border-transparent outline-none transition"
          />
        </div>

        {/* Total Marks */}
        <div>
          <label htmlFor="totalMarks" className="block text-sm font-semibold text-pmdcInk mb-2">
            Total Marks
          </label>
          <input
            id="totalMarks"
            type="number"
            name="totalMarks"
            value={formValue.totalMarks}
            onChange={handleChange}
            placeholder="100"
            disabled={loading}
            step="0.01"
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-pmdcSky focus:border-transparent outline-none transition"
          />
        </div>

        {/* Status */}
        <div>
          <label htmlFor="status" className="block text-sm font-semibold text-pmdcInk mb-2">
            Status
          </label>
          <select
            id="status"
            name="status"
            value={formValue.status}
            onChange={handleChange}
            disabled={loading}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-pmdcSky focus:border-transparent outline-none transition"
          >
            {statusOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Remarks - Full Width */}
      <div>
        <label htmlFor="remarks" className="block text-sm font-semibold text-pmdcInk mb-2">
          Remarks
        </label>
        <textarea
          id="remarks"
          name="remarks"
          value={formValue.remarks}
          onChange={(e) =>
            setFormValue((prev) => ({
              ...prev,
              remarks: e.target.value,
            }))
          }
          placeholder="Any additional remarks..."
          disabled={loading}
          rows="4"
          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-pmdcSky focus:border-transparent outline-none transition font-sans"
        />
      </div>

      {/* Form Actions */}
      <div className="flex flex-wrap gap-3 pt-4 border-t border-slate-200">
        <button
          type="submit"
          disabled={loading}
          className="pmdc-button px-6 py-2 text-sm font-medium inline-flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          {loading ? (
            <>
              <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></span>
              Saving...
            </>
          ) : (
            <>
              <Save className="h-4 w-4" />
              {submitLabel}
            </>
          )}
        </button>

        <Link href={cancelHref} className="inline-flex items-center gap-2 px-6 py-2 text-sm font-medium rounded-lg border border-pmdcSky text-pmdcSky hover:bg-sky-50 transition">
          <X className="h-4 w-4" />
          {cancelLabel}
        </Link>
      </div>
    </form>
  )
}
