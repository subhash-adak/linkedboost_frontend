"use client"

import { useRef } from "react"
import { motion } from "framer-motion"
import { MessageSquare, UserPlus, Check } from "lucide-react"

export default function AutomationAnimation() {
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <div
      ref={containerRef}
      className="relative h-[400px] w-full max-w-[500px] rounded-xl border bg-background p-2 shadow-xl"
    >
      <div className="absolute top-2 left-2 right-2 h-8 rounded bg-muted flex items-center px-3">
        <div className="flex space-x-2">
          <div className="h-3 w-3 rounded-full bg-red-500"></div>
          <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
          <div className="h-3 w-3 rounded-full bg-green-500"></div>
        </div>
        <div className="mx-auto text-xs font-medium">LinkedIn Automation</div>
      </div>

      <div className="mt-10 p-4 space-y-6">
        {/* Connection animation */}
        <motion.div
          className="flex items-center gap-3 p-3 rounded-lg border"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <div className="h-10 w-10 rounded-full bg-gradient-to-r from-purple-400 to-purple-600 flex items-center justify-center">
            <UserPlus className="h-5 w-5 text-white" />
          </div>
          <div className="flex-1">
            <div className="h-4 w-32 bg-muted rounded"></div>
            <div className="h-3 w-48 bg-muted rounded mt-2"></div>
          </div>
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1.5, duration: 0.3 }}>
            <Check className="h-5 w-5 text-green-500" />
          </motion.div>
        </motion.div>

        {/* Message animation */}
        <motion.div
          className="flex items-center gap-3 p-3 rounded-lg border"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 1.0, duration: 0.5 }}
        >
          <div className="h-10 w-10 rounded-full bg-gradient-to-r from-pink-400 to-pink-600 flex items-center justify-center">
            <MessageSquare className="h-5 w-5 text-white" />
          </div>
          <div className="flex-1">
            <div className="h-4 w-40 bg-muted rounded"></div>
            <div className="h-3 w-56 bg-muted rounded mt-2"></div>
          </div>
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 2.0, duration: 0.3 }}>
            <Check className="h-5 w-5 text-green-500" />
          </motion.div>
        </motion.div>

        {/* Analytics animation */}
        <motion.div
          className="mt-6"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 2.5, duration: 0.5 }}
        >
          <div className="h-4 w-32 bg-muted rounded mx-auto mb-4"></div>
          <div className="flex justify-between h-32">
            <motion.div
              className="w-12 bg-purple-500 rounded-t self-end"
              initial={{ height: 0 }}
              animate={{ height: "40%" }}
              transition={{ delay: 3.0, duration: 0.5 }}
            ></motion.div>
            <motion.div
              className="w-12 bg-pink-500 rounded-t self-end"
              initial={{ height: 0 }}
              animate={{ height: "65%" }}
              transition={{ delay: 3.2, duration: 0.5 }}
            ></motion.div>
            <motion.div
              className="w-12 bg-purple-500 rounded-t self-end"
              initial={{ height: 0 }}
              animate={{ height: "85%" }}
              transition={{ delay: 3.4, duration: 0.5 }}
            ></motion.div>
            <motion.div
              className="w-12 bg-pink-500 rounded-t self-end"
              initial={{ height: 0 }}
              animate={{ height: "55%" }}
              transition={{ delay: 3.6, duration: 0.5 }}
            ></motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
