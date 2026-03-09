import { Typography } from "@/components/ui/Typography";
import { cn } from "@/lib/utils";
import { CheckCircle, Phone, Sparkles, Video } from "lucide-react-native";
import { Text, TouchableOpacity, View } from "react-native";

interface PlanCardProps {
  minutes: number;
  price: number;
  description: string;
  popular?: boolean;
  onSelect: () => void;
  selected?: boolean;
}

export const PlanCard = ({
  minutes,
  price,
  description,
  popular = false,
  onSelect,
  selected = false,
}: PlanCardProps) => {
  return (
    <TouchableOpacity
      onPress={onSelect}
      activeOpacity={0.9}
      className={cn(
        "bg-white rounded-[32px] p-6 mb-4 shadow-sm border-2",
        selected
          ? "border-primary-500 bg-primary-50/10 shadow-md"
          : "border-gray-50",
        popular && !selected && "border-orange-100",
      )}
    >
      {popular && (
        <View className="absolute -top-3 right-8 bg-orange-500 px-4 py-1.5 rounded-full flex-row items-center border border-white shadow-sm">
          <Sparkles size={12} color="#FFFFFF" />
          <Text className="text-white text-[10px] font-black ml-1.5 uppercase tracking-widest">
            Most Popular
          </Text>
        </View>
      )}

      <View className="flex-row justify-between items-center mb-6">
        <View>
          <View className="flex-row items-baseline">
            <Text
              className={cn(
                "text-5xl font-black",
                selected ? "text-primary-600" : "text-gray-900",
              )}
            >
              {minutes}
            </Text>
            <Text className="text-gray-400 text-lg font-bold ml-1.5 uppercase">
              Min
            </Text>
          </View>
          <Typography
            variant="body-md"
            className="text-gray-500 font-bold mt-1"
          >
            {description}
          </Typography>
        </View>

        <View className="items-end">
          <Text className="text-primary-600 text-2xl font-black">E{price}</Text>
          <Typography
            variant="label"
            className="text-gray-400 font-bold mt-1 uppercase text-xs"
          >
            One-time
          </Typography>
        </View>
      </View>

      <View className="space-y-3 mb-6">
        {[
          { icon: Video, text: "HD Video Visiting" },
          { icon: Phone, text: "Crystal Clear Voice" },
          { icon: CheckCircle, text: "30-Day Validity" },
        ].map((item, i) => (
          <View key={i} className="flex-row items-center mt-1">
            <item.icon size={16} color={selected ? "#008400" : "#9CA3AF"} />
            <Typography
              variant="label"
              className={cn(
                "ml-3 font-bold",
                selected ? "text-primary-700" : "text-gray-500",
              )}
            >
              {item.text}
            </Typography>
          </View>
        ))}
      </View>

      <View
        className={cn(
          "h-14 rounded-2xl items-center justify-center border-2",
          selected
            ? "bg-primary-500 border-primary-500"
            : "bg-white border-primary-500/20",
        )}
      >
        <Typography
          variant="body-md"
          className={cn(
            "font-black text-sm uppercase tracking-widest",
            selected ? "text-white" : "text-primary-600",
          )}
        >
          {selected ? "Plan Selected" : "Select Plan"}
        </Typography>
      </View>
    </TouchableOpacity>
  );
};
