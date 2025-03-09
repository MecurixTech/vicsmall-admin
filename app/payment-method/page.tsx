"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input" 
import { Switch } from "@/components/ui/switch"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import Delete from '@mui/icons-material/Delete';

interface PaymentMethod {
  name: string
  enabled: boolean
  description: string
}

interface Currency {
  name: string
  isDefault: boolean
  exchangeRate: string
  symbol: string
}

export default function Page() {
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    {
      name: "Paystack (Credit/Debit)",
      enabled: true,
      description: "Take payments in person via checks.\nThis offline gateway can also be\nuseful to test purchases.",
    },
    {
      name: "Direct Bank Transfer",
      enabled: false,
      description: "Take payments in person via BACS.\nMore commonly known as direct bank/wire\ntransfer.",
    },
  ])

  const [currencies, setCurrencies] = useState<Currency[]>([
    {
      name: "NGN - Nigerian Naira (₦)",
      isDefault: true,
      exchangeRate: "1.0000",
      symbol: "",
    },
    {
      name: "GBP - Pound Sterling (£)",
      isDefault: false,
      exchangeRate: "0.0002",
      symbol: "",
    },
  ])

  // New currency dialog state
  const [isAddCurrencyOpen, setIsAddCurrencyOpen] = useState(false)
  const [newCurrency, setNewCurrency] = useState<Currency>({
    name: "",
    isDefault: false,
    exchangeRate: "1.0000",
    symbol: ""
  })

  const togglePaymentMethod = (index: number) => {
    setPaymentMethods((methods) =>
      methods.map((method, i) => (i === index ? { ...method, enabled: !method.enabled } : method)),
    )
  }

  const toggleDefaultCurrency = (index: number) => {
    setCurrencies((curr) =>
      curr.map((currency, i) => ({
        ...currency,
        isDefault: i === index,
      })),
    )
  }

  const updateCurrencySymbol = (index: number, symbol: string) => {
    setCurrencies((curr) => curr.map((currency, i) => (i === index ? { ...currency, symbol } : currency)))
  }

  const updateExchangeRate = (index: number, rate: string) => {
    setCurrencies((curr) => curr.map((currency, i) => (i === index ? { ...currency, exchangeRate: rate } : currency)))
  }

  const openAddCurrencyDialog = () => {
    setNewCurrency({
      name: "",
      isDefault: false,
      exchangeRate: "1.0000",
      symbol: ""
    })
    setIsAddCurrencyOpen(true)
  }

  const addCurrency = () => {
    if (newCurrency.name.trim() === "") {
      // Don't add if name is empty
      return
    }
    
    setCurrencies((curr) => [...curr, { ...newCurrency }])
    setIsAddCurrencyOpen(false)
  }

  const deleteCurrency = (index: number) => {
    setCurrencies((curr) => curr.filter((_, i) => i !== index))
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Payment Methods Section */}
      <div className="bg-white rounded-lg shadow mb-8">
        <div className="grid grid-cols-[1fr_100px_2fr_100px] items-center border-b border-gray-200 p-4">
          <div className="font-medium text-gray-700">Method</div>
          <div className="font-medium text-gray-700">Enabled</div>
          <div className="font-medium text-gray-700">Description</div>
          <div></div>
        </div>

        {paymentMethods.map((method, index) => (
          <div key={`payment-method-${index}`} className="grid grid-cols-[1fr_100px_2fr_100px] items-center border-b border-gray-200 p-4">
            <div className="font-medium">{method.name}</div>
            <div>
              <Switch checked={method.enabled} onCheckedChange={() => togglePaymentMethod(index)} />
            </div>
            <div className="text-gray-700 text-sm whitespace-pre-line">{method.description}</div>
            <div>
              <Button
                variant={method.enabled ? "secondary" : "outline"}
                className={method.enabled ? "bg-indigo-100 text-indigo-700 hover:bg-indigo-200" : ""}
              >
                {method.enabled ? "Manage" : "Finish Setup"}
              </Button>
            </div>
          </div>
        ))}

        <div className="p-4">
          <Button variant="outline" className="text-gray-500">
            Save Changes
          </Button>
        </div>
      </div>

      {/* Multicurrency Section */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Multicurrency</h2>

        <div className="bg-white rounded-lg shadow">
          <div className="grid grid-cols-[100px_2fr_1fr_1fr_80px] items-center border-b border-gray-200 p-4">
            <div className="font-medium text-gray-700 uppercase text-xs">Default</div>
            <div className="font-medium text-gray-700 uppercase text-xs">Currency</div>
            <div className="font-medium text-gray-700 uppercase text-xs">Exchange Rate</div>
            <div className="font-medium text-gray-700 uppercase text-xs">Custom Symbol</div>
            <div className="font-medium text-gray-700 uppercase text-xs">Action</div>
          </div>

          {currencies.map((currency, index) => (
            <div
              key={`currency-${index}`}
              className="grid grid-cols-[100px_2fr_1fr_1fr_80px] items-center border-b border-gray-200 p-4"
            >
              <div>
                <Switch checked={currency.isDefault} onCheckedChange={() => toggleDefaultCurrency(index)} />
              </div>
              <div>
                <Input value={currency.name} readOnly className="bg-gray-50" />
              </div>
              <div>
                <Input
                  value={currency.exchangeRate}
                  readOnly={currency.isDefault}
                  className={currency.isDefault ? "bg-gray-50" : ""}
                  onChange={(e) => updateExchangeRate(index, e.target.value)}
                />
              </div>
              <div>
                <Input
                  value={currency.symbol}
                  placeholder={`e.g ${currency.name.split(" ")[0]}`}
                  onChange={(e) => updateCurrencySymbol(index, e.target.value)}
                />
              </div>
              <div className="flex justify-center">
                {!currency.isDefault && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-gray-500 hover:text-gray-700"
                    onClick={() => deleteCurrency(index)}
                  >
                    <Delete className="h-5 w-5" />
                  </Button>
                )}
              </div>
            </div>
          ))}

          <div className="p-4 flex justify-end space-x-3">
            <Button variant="outline" className="text-gray-700">
              Update All Rates
            </Button>
            <Button
              variant="secondary"
              className="bg-indigo-100 text-indigo-700 hover:bg-indigo-200"
              onClick={openAddCurrencyDialog}
            >
              Add Currency
            </Button>
          </div>
        </div>
      </div>

      {/* Add Currency Dialog */}
      <Dialog open={isAddCurrencyOpen} onOpenChange={setIsAddCurrencyOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add New Currency</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="currency-name" className="text-right">
                Currency Name
              </Label>
              <Input
                id="currency-name"
                value={newCurrency.name}
                onChange={(e) => setNewCurrency({ ...newCurrency, name: e.target.value })}
                className="col-span-3"
                placeholder="e.g. USD - US Dollar ($)"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="exchange-rate" className="text-right">
                Exchange Rate
              </Label>
              <Input
                id="exchange-rate"
                value={newCurrency.exchangeRate}
                onChange={(e) => setNewCurrency({ ...newCurrency, exchangeRate: e.target.value })}
                className="col-span-3"
                placeholder="e.g. 0.0013"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="currency-symbol" className="text-right">
                Symbol
              </Label>
              <Input
                id="currency-symbol"
                value={newCurrency.symbol}
                onChange={(e) => setNewCurrency({ ...newCurrency, symbol: e.target.value })}
                className="col-span-3"
                placeholder="e.g. $"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="is-default" className="text-right">
                Make Default
              </Label>
              <div className="col-span-3">
                <Switch
                  id="is-default"
                  checked={newCurrency.isDefault}
                  onCheckedChange={(checked) => setNewCurrency({ ...newCurrency, isDefault: checked })}
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setIsAddCurrencyOpen(false)}>
              Cancel
            </Button>
            <Button type="button" onClick={addCurrency}>
              Add Currency
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}