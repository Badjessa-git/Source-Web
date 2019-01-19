package com.lehigh.source;

import java.util.*;

/**
 * This is the job class, any service that we offer will be done in this particular class
 */

public class Jobs{

    public List<Club> getAllClubUse(List<AllRequestRes> requestRes) {
        if (requestRes == null || requestRes.isEmpty()) {
            return new ArrayList<>();
        }

        //Insert all of the items into a hashmap
        Map<String, Integer> map = new HashMap<>();
        for(AllRequestRes curReq: requestRes) {
            if (!map.containsKey(curReq.club)) {
                map.putIfAbsent(curReq.club, 1);
                continue;
            }
            int value = map.get(curReq.club);
            map.replace(curReq.club, value, value+1);
        }

        List<Club> res = new ArrayList<>();
        int size = requestRes.size();

        for (Map.Entry<String, Integer> entry : map.entrySet()){
            String name = entry.getKey();
            String usage = ""+entry.getValue()+"/"+size;
            Double percentage = ((double) entry.getValue()/size) * 100;
            Club curClub = new Club(name, usage, percentage);
            res.add(curClub);
        }
        return res;
    }

    /**
     * Returns all the tops used clubs
     * @param number of clubs to return
     * @return only the top clubs
     */
    public List<Club> getTopClubs(List<Club> allclubs, int number) {
        Collections.sort(allclubs, Club.sortClubs());
        List<Club> res = new ArrayList<>();
        if (allclubs.size() < number) {
            for(int i = 0; i < allclubs.size(); i++) {
                res.add(allclubs.get(i));
            }
            return res;
        }
        for(int i = 0; i < number; i++) {
            res.add(allclubs.get(i));
        }
        return res;
    }
}