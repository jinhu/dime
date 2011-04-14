class CreateGames < ActiveRecord::Migration
  def self.up
    create_table :games do |t|
      t.string :gerne
      t.string :name
      t.string :image
      t.string :version

      t.timestamps
    end
  end

  def self.down
    drop_table :games
  end
end
