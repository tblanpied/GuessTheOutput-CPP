#include <iostream>

namespace N {
    struct S {};
    void h(S) { std::cout << 'n'; }
}

void h(int) { std::cout << 'g'; }

int main() {
    N::S s;
    h(s);
    h(0);
    std::cout << "\n";
}
