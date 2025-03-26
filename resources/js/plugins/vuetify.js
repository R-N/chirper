import { createVuetify } from 'vuetify';
import 'vuetify/styles';

export default createVuetify({
    ssr: true,
    defaults: {
      VTextField: { hideDetails: 'auto', density: 'compact', variant: 'underlined' },
      VSelect: { hideDetails: 'auto', density: 'compact' },
      VCheckbox: { hideDetails: 'auto', density: 'compact' },
      VRadioGroup: { hideDetails: 'auto', density: 'compact' },
      VTextarea: { hideDetails: 'auto', density: 'compact', variant: 'underlined' },
      VBtn: { variant: 'elevated' },
      VAppBar: { class: "pl-5 pr-5" },
      VAlert: { density: 'compact' },
      VCard: { density: 'compact', class: "d-flex flex-column" },
      VCardTitle: { class: "d-flex pa-2 ga-2" },
      VCardText: { class: "d-flex flex-column pa-2 ga-2" },
      VCardAction: { class: "d-flex flex-column pa-2 ga-2" },
    },
    theme: {
        defaultTheme: 'light',
        themes: {
          light: {
            colors: {
              background: '#F5F5F5',
            },
            // variables: {
            //   'field-focused-border-opacity': 0,
            // },
          },
        },
    },
});