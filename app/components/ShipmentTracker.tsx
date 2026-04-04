"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Package, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ShipmentTracker() {
  const [trackingNumber, setTrackingNumber] = useState("");
  const [isTracking, setIsTracking] = useState(false);
  const [hasTracked, setHasTracked] = useState(false);

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingNumber.trim()) return;

    setIsTracking(true);
    // Simulate tracking API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsTracking(false);
    setHasTracked(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.6 }}
      className="w-full max-w-xl"
    >
      <div className="relative group">
        {/* Glow effect */}
        <div className="absolute -inset-1 bg-gradient-to-r from-orange-500/20 to-blue-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        <div className="relative bg-[#0f172a]/60 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-2 shadow-2xl">
          <form onSubmit={handleTrack} className="flex flex-col sm:flex-row gap-2">
            <div className="relative flex-1">
              <Package className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <Input
                type="text"
                placeholder="Enter tracking number..."
                value={trackingNumber}
                onChange={(e) => setTrackingNumber(e.target.value)}
                className="pl-12 pr-4 py-6 bg-slate-900/50 border-slate-700 text-slate-100 placeholder:text-slate-500 rounded-xl focus:border-orange-500/50 focus:ring-orange-500/20 text-base"
              />
            </div>
            <Button
              type="submit"
              disabled={isTracking || !trackingNumber.trim()}
              className="bg-orange-500 hover:bg-orange-600 disabled:bg-slate-700 text-white font-semibold px-8 py-6 rounded-xl shadow-lg shadow-orange-500/20 transition-all hover:shadow-orange-500/30 hover:-translate-y-0.5 disabled:hover:translate-y-0 disabled:shadow-none"
            >
              {isTracking ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Tracking...
                </>
              ) : (
                <>
                  <Search className="w-5 h-5 mr-2" />
                  Track
                </>
              )}
            </Button>
          </form>

          {/* Tracking Result Mock */}
          {hasTracked && !isTracking && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="mt-4 p-4 bg-slate-800/50 rounded-xl border border-slate-700/50"
            >
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                <span className="text-slate-300 text-sm">
                  Shipment <span className="text-orange-400 font-mono">{trackingNumber}</span> is{" "}
                  <span className="text-green-400 font-semibold">In Transit</span>
                </span>
              </div>
              <p className="text-slate-500 text-xs mt-2 ml-6">
                Last updated: Just now • Estimated delivery: Tomorrow by 5:00 PM
              </p>
            </motion.div>
          )}
        </div>
      </div>

      {/* Quick tracking hints */}
      <div className="flex flex-wrap items-center justify-center gap-4 mt-4 text-xs text-slate-500">
        <span>Try tracking:</span>
        {["DV123456", "DV789012", "DV345678"].map((num) => (
          <button
            key={num}
            onClick={() => setTrackingNumber(num)}
            className="text-slate-400 hover:text-orange-400 transition-colors font-mono"
          >
            {num}
          </button>
        ))}
      </div>
    </motion.div>
  );
}
