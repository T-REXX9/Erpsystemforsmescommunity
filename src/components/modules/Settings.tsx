export function Settings() {
  const settingsCards = [
    {
      title: 'Company Settings',
      description: 'Manage company information and preferences',
    },
    {
      title: 'User Management',
      description: 'Add and manage user accounts and permissions',
    },
    {
      title: 'Tax Configuration',
      description: 'Configure GST rates and tax settings',
    },
    {
      title: 'Integration',
      description: 'Connect with banks and third-party services',
    },
    {
      title: 'Backup & Security',
      description: 'Manage data backup and security settings',
    },
    {
      title: 'Reports & Analytics',
      description: 'Customize reports and analytics preferences',
    },
  ];

  return (
    <div className="p-6">
      <h1>Settings</h1>
      <p className="text-muted-foreground">Configure your ERP system settings</p>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {settingsCards.map((card) => (
          <div key={card.title} className="p-6 border rounded-lg hover:border-primary/50 transition-colors cursor-pointer">
            <h3 className="font-medium mb-2">{card.title}</h3>
            <p className="text-sm text-muted-foreground">{card.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
