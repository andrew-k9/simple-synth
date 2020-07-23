class CreateSettings < ActiveRecord::Migration[6.0]
  def change
    create_table :settings do |t|
      t.string :name
      t.float :gain
      t.float :stop_time
      t.float :a_frequency

      t.belongs_to :category

      t.timestamps
    end
  end
end
