#include <iostream>
#include <map>

int main() {
    std::map<int, int> m;

    m[2] = 5;
    m[1] += 1;

    std::cout << m.size() << ' ' << m[1] << m[2] << "\n";
}
