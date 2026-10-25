import { useEffect, useRef, useState } from 'react'
import dispensingTechnicianImage from './assets/image.png_20261025140854.jpg'
import hospitalTrainingImage from './assets/image.png_20261025140848.jpg'
import experienceCertificateImage from './assets/image.png_20261025140857.jpg'
import enrolmentRenewalImage from './assets/image.png_20261025140850.jpg'

type CertificateCategory = 'Education' | 'Professional Qualification' | 'Training' | 'Experience'

type CertificateRecord = {
  id: string
  title: string
  category: CertificateCategory
  institution: string
  date: string
  imagePath: string
  imageAlt: string
  description?: string
}

const CERTIFICATES: CertificateRecord[] = [
  {
    id: 'dispensing-technician',
    title: 'Dispensing Technician',
    category: 'Professional Qualification',
    institution: 'Punjab Medical Faculty',
    date: 'June 2024',
    imagePath: dispensingTechnicianImage,
    imageAlt: 'Punjab Medical Faculty Dispensing Technician certificate',
    description: 'Professional qualification recorded in the portfolio.',
  },
  {
    id: 'hospital-training',
    title: 'Hospital Training',
    category: 'Training',
    institution: 'Aziz Bhatti Shaheed Teaching Hospital, Gujrat',
    date: '1 Jan 2022 to 31 Dec 2023',
    imagePath: hospitalTrainingImage,
    imageAlt: 'Pharmacy technician training certificate from Aziz Bhatti Shaheed Teaching Hospital',
    description: 'Documented practical hospital training.',
  },
  {
    id: 'irfan-hospital-experience',
    title: 'Experience Certificate',
    category: 'Experience',
    institution: 'Irfan Hospital',
    date: 'Certificate dated 15 Dec 2025',
    imagePath: experienceCertificateImage,
    imageAlt: 'Irfan Hospital experience certificate for Pharmacy Technician / Dispenser',
    description: 'Pharmacy Technician / Dispenser experience recorded in the supplied certificate.',
  },
  {
    id: 'pmf-enrolment-renewal',
    title: 'Certificate of Renewal of Enrolment',
    category: 'Professional Qualification',
    institution: 'Punjab Medical Faculty',
    date: 'Issued 1 Dec 2025',
    imagePath: enrolmentRenewalImage,
    imageAlt: 'Punjab Medical Faculty certificate of renewal of enrolment',
    description: 'Renewal of enrolment for the Dispensing Technician category.',
  },
]

const CERTIFICATE_FILTERS = ['All', 'Education', 'Professional Qualification', 'Training', 'Experience'] as const
type CertificateFilter = (typeof CERTIFICATE_FILTERS)[number]

const DocumentIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 3.75h7l4 4V20a.75.75 0 0 1-.75.75h-10.5A.75.75 0 0 1 6 20V4.5a.75.75 0 0 1 .75-.75Z" /><path d="M14 4v4h4M9 13h6M9 16h6" /></svg>
)

const CloseIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18" /></svg>
)

const ArrowIcon = ({ direction }: { direction: 'previous' | 'next' }) => (
  <svg viewBox="0 0 24 24" aria-hidden="true"><path d={direction === 'next' ? 'M5 12h14M12 5l7 7-7 7' : 'M19 12H5m7 7-7-7 7-7'} /></svg>
)

function CertificatesSection() {
  const [filter, setFilter] = useState<CertificateFilter>('All')
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [zoom, setZoom] = useState(1)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const dialogRef = useRef<HTMLDivElement>(null)
  const selectedIdRef = useRef(selectedId)
  const filteredCertificates = CERTIFICATES.filter((certificate) => filter === 'All' || certificate.category === filter)
  const filteredCertificatesRef = useRef(filteredCertificates)
  const selectedCertificate = CERTIFICATES.find((certificate) => certificate.id === selectedId)
  const modalOpen = selectedId !== null

  selectedIdRef.current = selectedId
  filteredCertificatesRef.current = filteredCertificates

  useEffect(() => {
    if (!modalOpen) return

    const previousOverflow = document.body.style.overflow
    const previouslyFocused = document.activeElement instanceof HTMLElement ? document.activeElement : null
    document.body.style.overflow = 'hidden'
    closeButtonRef.current?.focus()

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        setSelectedId(null)
        return
      }

      if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
        const currentList = filteredCertificatesRef.current
        if (currentList.length < 2) return
        event.preventDefault()
        const currentIndex = currentList.findIndex((certificate) => certificate.id === selectedIdRef.current)
        const offset = event.key === 'ArrowRight' ? 1 : -1
        const nextIndex = (currentIndex + offset + currentList.length) % currentList.length
        setSelectedId(currentList[nextIndex].id)
        setZoom(1)
        return
      }

      if (event.key === 'Tab') {
        const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(
          'button:not([disabled]), a[href]:not([tabindex="-1"]), [tabindex="0"]',
        )
        if (!focusable?.length) return
        const first = focusable[0]
        const last = focusable[focusable.length - 1]
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault()
          last.focus()
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault()
          first.focus()
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = previousOverflow
      previouslyFocused?.focus()
    }
  }, [modalOpen])

  const openCertificate = (id: string) => {
    setZoom(1)
    setSelectedId(id)
  }

  const closeCertificate = () => setSelectedId(null)

  const changeCertificate = (offset: number) => {
    if (filteredCertificates.length < 2 || !selectedCertificate) return
    const currentIndex = filteredCertificates.findIndex((certificate) => certificate.id === selectedCertificate.id)
    const nextIndex = (currentIndex + offset + filteredCertificates.length) % filteredCertificates.length
    setSelectedId(filteredCertificates[nextIndex].id)
    setZoom(1)
  }

  return (
    <section className="certificates section" id="certificates" aria-labelledby="certificates-title">
      <div className="certificates-heading">
        <div>
          <p className="kicker">05 / DOCUMENT ARCHIVE</p>
          <h2 id="certificates-title">Certificates &amp; Credentials</h2>
        </div>
        <p className="certificates-subtitle">A record of academic achievement, professional qualification, and practical training.</p>
      </div>

      <div className="certificate-filters" role="group" aria-label="Filter credentials by category">
        {CERTIFICATE_FILTERS.map((category) => (
          <button
            key={category}
            className={filter === category ? 'certificate-filter active' : 'certificate-filter'}
            type="button"
            aria-pressed={filter === category}
            onClick={() => {
              setFilter(category)
              setSelectedId(null)
            }}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="certificate-grid" role="region" aria-label="Certificates and credentials" aria-live="polite" tabIndex={0}>
        {filteredCertificates.map((certificate) => (
          <article className="certificate-card" key={certificate.id}>
            <div className="certificate-card-media">
              <img src={certificate.imagePath} alt={certificate.imageAlt} loading="lazy" />
            </div>
            <div className="certificate-card-content">
              <p className="certificate-category">{certificate.category}</p>
              <h3>{certificate.title}</h3>
              <p className="certificate-institution">{certificate.institution}</p>
              <p className="certificate-date">{certificate.date}</p>
              {certificate.description && <p className="certificate-description">{certificate.description}</p>}
              <button className="certificate-view-button" type="button" onClick={() => openCertificate(certificate.id)} aria-label={`View ${certificate.title} certificate`}>
                <DocumentIcon /> View Certificate <ArrowIcon direction="next" />
              </button>
            </div>
          </article>
        ))}
        {filteredCertificates.length === 0 && <p className="certificate-empty-state">No education documents are included in this archive.</p>}
      </div>
      <p className="certificate-slider-hint" aria-hidden="true">Swipe to explore <span>&#183;</span> {filteredCertificates.length} documents</p>

      {selectedCertificate && (
        <div
          className="certificate-modal-backdrop"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closeCertificate()
          }}
        >
          <div
            className="certificate-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="certificate-dialog-title"
            ref={dialogRef}
          >
            <div className="certificate-dialog-header">
              <div>
                <p className="certificate-category">{selectedCertificate.category}</p>
                <h2 id="certificate-dialog-title">{selectedCertificate.title}</h2>
                <p>{selectedCertificate.institution} · {selectedCertificate.date}</p>
              </div>
              <button className="certificate-close" type="button" ref={closeButtonRef} onClick={closeCertificate} aria-label="Close certificate viewer">
                <CloseIcon />
              </button>
            </div>

            <div className="certificate-viewer-toolbar">
              <div className="certificate-zoom-controls" aria-label="Image zoom controls">
                <button type="button" onClick={() => setZoom((value) => Math.max(0.75, value - 0.25))} aria-label="Zoom out" disabled={zoom <= 0.75}>−</button>
                <span aria-live="polite">{Math.round(zoom * 100)}%</span>
                <button type="button" onClick={() => setZoom((value) => Math.min(2.5, value + 0.25))} aria-label="Zoom in" disabled={zoom >= 2.5}>+</button>
                <button type="button" onClick={() => setZoom(1)} aria-label="Reset zoom">Reset</button>
              </div>
              <div className="certificate-file-actions">
                <a href={selectedCertificate.imagePath} target="_blank" rel="noopener noreferrer">Open Full Size</a>
                <a href={selectedCertificate.imagePath} download>Download</a>
              </div>
            </div>

            <div className="certificate-image-scroll" tabIndex={0} aria-label="Scrollable certificate image area">
              <img
                className="certificate-viewer-image"
                src={selectedCertificate.imagePath}
                alt={selectedCertificate.imageAlt}
                style={{ width: `${zoom * 100}%` }}
              />
            </div>
            {filteredCertificates.length > 1 && (
              <div className="certificate-modal-navigation">
                <button type="button" onClick={() => changeCertificate(-1)} aria-label="View previous certificate"><ArrowIcon direction="previous" /> Previous</button>
                <span>{filteredCertificates.findIndex((item) => item.id === selectedCertificate.id) + 1} / {filteredCertificates.length}</span>
                <button type="button" onClick={() => changeCertificate(1)} aria-label="View next certificate">Next <ArrowIcon direction="next" /></button>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  )
}

export default CertificatesSection
