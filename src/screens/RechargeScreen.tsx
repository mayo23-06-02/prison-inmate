import { PackageCard } from "@/components/recharge/PackageCard";
import { TransactionHistoryItem } from "@/components/recharge/TransactionHistoryItem";
import { Input } from "@/components/ui/Input";
import { Typography } from "@/components/ui/Typography";
import { cn } from "@/lib/utils";
import { Ticket } from "lucide-react-native";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const PACKAGES = [
  {
    id: "1",
    name: "Standard Local",
    minutes: 15,
    price: "49.99",
    validity: "3 Days",
    type: "Local" as const,
  },
  {
    id: "2",
    name: "Extended Local",
    minutes: 30,
    price: "89.99",
    validity: "7 Days",
    type: "Local" as const,
  },
  {
    id: "3",
    name: "Basic Inter",
    minutes: 15,
    price: "99.99",
    validity: "5 Days",
    type: "International" as const,
  },
  {
    id: "4",
    name: "Global Plus",
    minutes: 45,
    price: "249.99",
    validity: "14 Days",
    type: "International" as const,
  },
];

const MOCK_TRANSACTIONS = [
  {
    id: "T1",
    date: "12 Mar 2024, 10:45 AM",
    packageName: "Extended Local",
    amount: "89.99",
    minutesAdded: 30,
    status: "Completed" as const,
  },
  {
    id: "T2",
    date: "10 Mar 2024, 09:12 AM",
    packageName: "Standard Local",
    amount: "49.99",
    minutesAdded: 15,
    status: "Completed" as const,
  },
];

export default function RechargeScreen() {
  const [voucherCode, setVoucherCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);

  const handleVoucherRecharge = () => {
    if (voucherCode.length < 10) {
      Alert.alert(
        "Invalid Code",
        "Please enter a valid 10-digit voucher code.",
      );
      return;
    }

    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      Alert.alert(
        "Success!",
        "Voucher redeemed successfully. 30 minutes added to your account.",
        [{ text: "Great", onPress: () => setVoucherCode("") }],
      );
    }, 2000);
  };

  const handlePackageSelect = (id: string) => {
    setSelectedPackage(id);
    const pkg = PACKAGES.find((p) => p.id === id);
    if (pkg) {
      Alert.alert(
        "Confirm Purchase",
        `Do you want to purchase ${pkg.name} for SZL ${pkg.price}?`,
        [
          { text: "Cancel", style: "cancel" },
          {
            text: "Confirm",
            onPress: () => {
              Alert.alert("Success", "Package purchased successfully!");
              setSelectedPackage(null);
            },
          },
        ],
      );
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        className="flex-1"
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          className="flex-1 px-6"
          contentContainerStyle={{ paddingBottom: 40 }}
        >
          {/* Header */}
          <View className="py-8">
            <Typography
              variant="heading-lg"
              className="text-gray-900 font-black uppercase tracking-tight"
            >
              Recharge Account
            </Typography>
            <Typography variant="body-sm" className="text-gray-500 mt-1">
              Add minutes to your balance using vouchers or packages.
            </Typography>
          </View>

          {/* Voucher Section */}
          <View className="bg-primary-50 p-6 rounded-[32px] border border-primary-100 mb-8">
            <Typography
              variant="heading-md"
              className="text-primary-700 font-black uppercase tracking-widest text-sm mb-4"
            >
              Voucher Recharge
            </Typography>
            <Input
              placeholder="Enter 10-digit voucher code"
              value={voucherCode}
              onChangeText={setVoucherCode}
              keyboardType="number-pad"
              maxLength={10}
              leftIcon={<Ticket size={20} color="#008400" />}
              className="bg-white border-primary-200"
            />
            <TouchableOpacity
              onPress={handleVoucherRecharge}
              disabled={loading || !voucherCode}
              className={cn(
                "h-14 rounded-2xl items-center justify-center mt-4 shadow-sm",
                loading || !voucherCode ? "bg-gray-300" : "bg-primary-500",
              )}
            >
              {loading ? (
                <ActivityIndicator color="white" />
              ) : (
                <Typography
                  variant="button"
                  className="text-white font-black uppercase tracking-widest"
                >
                  Redeem Voucher
                </Typography>
              )}
            </TouchableOpacity>
          </View>

          {/* Packages Section */}
          <View className="mb-8">
            <View className="flex-row justify-between items-center mb-4">
              <Typography
                variant="heading-md"
                className="text-gray-900 font-black uppercase tracking-widest text-sm"
              >
                Available Packages
              </Typography>
            </View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              className="-mx-6 px-6"
            >
              {PACKAGES.map((pkg) => (
                <PackageCard
                  key={pkg.id}
                  {...pkg}
                  selected={selectedPackage === pkg.id}
                  onSelect={() => handlePackageSelect(pkg.id)}
                />
              ))}
            </ScrollView>
          </View>

          {/* Transaction History Section */}
          <View>
            <Typography
              variant="heading-md"
              className="text-gray-900 font-black uppercase tracking-widest text-sm mb-4"
            >
              Recent Transactions
            </Typography>
            {MOCK_TRANSACTIONS.map((tx) => (
              <TransactionHistoryItem key={tx.id} transaction={tx} />
            ))}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
