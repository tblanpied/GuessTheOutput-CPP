#include <iostream>
#include <map>

int main() {
    std::map<int, int> m;

    auto r1 = m.insert({1, 1});
    auto r2 = m.insert({1, 2});

    std::cout << r1.second << r2.second << m[1] << "\n";
}
