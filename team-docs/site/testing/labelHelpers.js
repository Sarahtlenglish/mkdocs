import { enhederConfig } from '@/configs/enhederConfig'
import { egenkontrolConfig } from '@/configs/egenkontrolConfig'
import { tjeklisteConfig } from '@/configs/tjeklisteConfig'
import { rolleOptions } from '@/configs/brugerConfig'

export function findLabel(options, value) {
  if (!options || !value) return value
  const option = options.find(opt => opt.value === value)
  return option ? option.label : value
}

export const getLocationLabel = value => findLabel(enhederConfig.locations, value)

export const findLocationValue = (label) => {
  const location = enhederConfig.locations.find(loc => loc.label === label)
  return location ? location.value : label
}

export const getTypeLabel = value => findLabel(enhederConfig.types, value)

export const getRoleLabel = value => findLabel(rolleOptions, value)

export const getUserName = (id, brugerStore) => {
  const bruger = brugerStore.getBrugerById(id)
  return bruger ? bruger.fuldeNavn : id
}

export const getEnhedName = (id, enhedStore) => {
  const enhed = enhedStore.getEnhedById(id)
  return enhed ? enhed.name : id
}

export const getTjeklisteName = (id, tjeklisteStore) => {
  const tjekliste = tjeklisteStore.tjeklister.find(t => t.id === id)
  return tjekliste ? tjekliste.navn || tjekliste.tjeklisteNavn : id
}

export const getFrekvensLabel = value => findLabel(tjeklisteConfig.frekvensOptions, value)
export const getTidspunktLabel = value => findLabel(egenkontrolConfig.tidspunktOptions, value)
export const getTjeklisteTypeLabel = value => findLabel(tjeklisteConfig.typeOptions, value)

export const processEnheder = (enheder) => {
  return enheder.map(item => ({
    ...item,
    type: getTypeLabel(item.type),
    location: getLocationLabel(item.location)
  }))
}

export const processTjeklister = (tjeklister) => {
  return tjeklister.map(item => ({
    ...item,
    type: getTjeklisteTypeLabel(item.type),
    frekvens: getFrekvensLabel(item.frekvens)
  }))
}

export const processBrugere = (brugere) => {
  return brugere.map(item => ({
    ...item,
    rolle: getRoleLabel(item.rolle)
  }))
}

export const getStatusLabel = (value) => {
  const statusMap = {
    afvigelse: 'Afvigelse',
    overskredet: 'Overskredet',
    udført: 'Udført',
    aktiv: 'Aktiv',
    inaktiv: 'Inaktiv'
  }
  return statusMap[value] || 'Inaktiv'
}

export const getBannerType = (status) => {
  const bannerMap = {
    udført: 'completed',
    inaktiv: 'inactive',
    afvigelse: 'deviation',
    overskredet: 'overdue',
    aktiv: 'active'
  }
  return bannerMap[status] || null
}

export const processCalendarTasks = (tasks) => {
  if (!tasks) return []
  return tasks.map((task) => {
    const historyEntry = task.historik?.find(entry => entry.dato === task.dato)
    const status = historyEntry?.status || 'inaktiv'
    return {
      ...task,
      location: getLocationLabel(task.location),
      type: getTypeLabel(task.type),
      status: status,
      statusLabel: getStatusLabel(status),
      enhedId: task.enhedId || task.details,
      ansvarligeBrugere: task.ansvarligeBrugere
    }
  })
}

export const getTjeklisteFrekvens = (id, tjeklisteStore) => {
  const tjekliste = tjeklisteStore.tjeklister.find(t => t.id === id)
  if (tjekliste && tjekliste.frekvens) {
    return getFrekvensLabel(tjekliste.frekvens)
  }
  return ''
}
