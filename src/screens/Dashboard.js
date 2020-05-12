import React from "react"

const Dashboard = ({ Stack }) => {
  return (
    <Stack.Screen
      name="Dashboard"
      component={Dashboard}
      options={{ headerShown: false }}
    />
  )
}

export default Dashboard
