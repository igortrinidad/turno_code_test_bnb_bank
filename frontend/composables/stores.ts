

import { useSharedStore as useSharedStoreImport } from "@/modules/shared/store"
export const useSharedStore = () => {
  return useSharedStoreImport()
}

import { useUserStore as useUserStoreImport } from "@/modules/user/store"
export const useUserStore = () => {
  return useUserStoreImport()
}

import { useBalanceStore as useBalanceStoreImport } from "@/modules/balance/store"
export const useBalanceStore = () => {
  return useBalanceStoreImport()
}