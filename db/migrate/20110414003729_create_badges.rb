class CreateBadges < ActiveRecord::Migration
  def self.up
    create_table :badges do |t|
      t.integer :game_id
      t.string :name
      t.string :image

      t.timestamps
    end
  end

  def self.down
    drop_table :badges
  end
end
