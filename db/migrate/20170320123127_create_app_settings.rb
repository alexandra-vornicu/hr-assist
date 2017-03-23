class CreateAppSettings < ActiveRecord::Migration[5.0]
  def change
    create_table :app_settings do |t|
      t.string :key , :unique => true
      t.string :value

      t.timestamps
    end
  end
end
