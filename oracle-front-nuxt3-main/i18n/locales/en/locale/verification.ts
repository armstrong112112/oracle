export default {
  title: 'Verification Application',
  applicationPreview: 'Application Preview',
  steps: {
    step1: 'Categories & Duration',
    step2: 'Basic Details',
    step3: 'Contact Details',
    step4: 'Screenshots & Proofs',
  },
  next: 'Next',
  submit: 'Submit',
  categoriesAndDuration: {
    selectCategory: 'Select Verification Category',
    choosePeriod: 'Choose Verification Period',
    description:
      'Multiple categories may be selected. The primary category is billed at the full price; each additional category receives a 50% fee reduction.',
    understood: 'Understood',
  },

  chooseVerificationPeriod: {
    monthLabel: '{month} month',
    labels: {
      price140: '140% of price',
      regular: 'Regular price',
      cheaper40: '40% cheaper',
      cheaper50: '50% cheaper',
    },
    goodDeal: 'Good deal',
  },
  chooseCategoryDialog: {
    chooseCategory: 'Choose Verification Category',
    category: 'Categories',
    save: 'Save',
    titles: {
      design: 'Design',
      traffic: 'Traffic',
      devops: 'DevOps',
      person: 'Person',
      service_company: 'Service / Company',
      platform_listing_post: 'Platform Listing / Post',
      fraud_scam: 'Fraud / Scam',
      misrepresentation: 'Misrepresentation',
      harassment_abuse: 'Harassment / Abuse',
      unauthorized_charge: 'Unauthorized Charge',
      data_privacy: 'Data Privacy',
      other: 'Other',
    },
    status: {
      select: 'Select',
      selected: 'Selected',
    },
  },
  basicDetails: {
    title: 'Tell us a little bit about you and your business',
    placeholder:
      'Where did you start, what do you do, and who can vouch for you?...',
    businessPresence: 'Business Web Presence',
    linkLabel: 'Link {index}',
    linkPlaceholder: 'Drop the link here...',
    descriptionPlaceholder: 'Description',
    addLink: 'Add link',
    understood: 'Understood',
  },
  contactDetails: {
    title: 'My Contact Details',
    description: 'At least one contact detail is required',
    understood: 'Understood',
    placeholder: 'Your {contact} contact',
  },
  screenshots: {
    title: 'Add up to 5 screenshots',
    uploadTitle: 'Upload here',
    uploadResolution: 'The recommended image resolution is 1080x1920 pixels.',
    uploadSize: 'Max. 15mb',
    understood: 'Understood',
    errors: {
      maxFiles:
        'Maximum Files Reached. You can upload up to 5 files. Please remove some files before adding more.',
      fileSize:
        'File Size Limit Exceeded. Your file is too large. Maximum allowed size is 15MB. Please compress your file or upload a smaller one.',
      duplicate:
        'Duplicate File. This file has already been uploaded. Please select a different file.',
      uploadFailed:
        'Upload Failed. Something went wrong during the upload process. Please try again in a few moments.',
      lowResolution:
        'Low Resolution Image. This image has a very low resolution. Please upload a higher quality image for better results.',
      invalidImage: 'Invalid image file. Please upload a valid image.',
      readFailed: 'Failed to read file data.',
    },
  },
  verificationPreview: {
    header: 'Application Preview',
    submit: 'Submit',
    verificationCategory: 'Verification Category',
    verificationPeriod: 'Verification Period',
    month: 'month',
    businessDescription: 'Business Description',
    webPresence: 'Business Web Presence',
    link: 'Link',
    contactDetails: 'Contact Details',
    trackButton: 'Track Application',
  },
  verificationTrackingTitle: 'Verification Tracking',
}
